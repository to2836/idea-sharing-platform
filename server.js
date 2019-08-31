var http = require('http');
var express = require('express');
var mysql = require('mysql');
var fs = require('fs');
var cookieParser = require('cookie-Parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
let storage = multer.diskStorage({
    destination: function(req, file ,callback){
        callback(null, "uploads/")
    },
    filename: function(req, file, callback){
        callback(null, file.originalname)
    }
})
var upload = multer({storage:storage});
var app = express();
var port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(session({
    secret:'(($%)gj43ufd**',
    cookie: {
        maxAge: 1000 *  60 * 60 // 쿠키 유효기간 1시간
    },
    resave: false,
    saveUninitialized: true
}));

var db = mysql.createConnection({
    user:'root',
	password:'logiclab',
	database:'isharing',
	port:3000,
	socketPath: '/tmp/mysql.sock'
});



app.get('/',(req,res)=>{
    
    fs.readFile('./public/main.html',(err,data)=>{
        if(err) res.end('<h1>not found page!!<h1>');
         else res.end(data);
    });

});

app.post('/sessionCheck',(req,res)=>{

    
    if(req.session.name){
        db.query(`select image from user where id='${req.session.name}'`,function(err,data){
            if(err){
                console.log(err);
                res.end("error");
            }
            else{
                console.log(data[0].image);
                if(data.length!=0){
                    if(data[0].image==null) res.send({result:'success',id:req.session.name,img:"none.jpg"});
                    else res.send({result:'success',id:req.session.name,img:data[0].image});
                }
                else{
                    res.send({result:'success',id:req.session.name,img:"none.jpg"});
                }
            }
            
        });
        
    }
    else{
        res.send({result:'fail'});        
    }
});

app.get('/login',(req,res)=>{

    fs.readFile('./public/login.html',function(err,data){
        if(err) console.log(err);
        else res.end(data);
    });
    res.end();
});

app.post('/logout',(req,res)=>{

    req.session.name=undefined;
    res.end();
    
});

app.post('/addUser',upload.single('file'),(req,res)=>{

    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    var phExp = /^\d{3}-\d{3,4}-\d{4}$/;
    var telExp = /^\d{2,3}-\d{3,4}-\d{4}$/;
    var profiel_image;
    try {
        profiel_image=req.file.filename;    
    } catch (error) {
        profiel_image="none.jpg";
    }
    var id=req.body.id;
    var pw=req.body.pw;
    var email=req.body.email1+"@"+req.body.email2;
    var phone=req.body.phone1+"-"+req.body.phone2+"-"+req.body.phone3;
    db.query('insert into user (id, pw, email, phone, image) values(?,?,?,?,?)',[id, pw, email, phone, profiel_image],(err,data)=>{
        if(err) console.log(err);
        else res.send("success");
    });
});

app.post('/confirmId',(req,res)=>{
    console.log("/confirmId");
    var id=req.body.id;

    db.query(`select * from user where id="${id}"`,id,(err,data)=>{
        if(err) console.log(err);
        else{
            if(data.length==0){
                console.log("success");
                res.send("success");
            }
            else{
                console.log("fail");
                res.send("fail");
            }
        }
        res.end();
    });
});

app.post('/loginProcess',(req,res)=>{
    var id=req.body.id;
    var pw=req.body.pw;

    db.query(`select * from user where id='${id}' && pw='${pw}'`,(err,data)=>{
        if(err) console.log(err);
        else{
            if(data.length!=0){
                req.session.name=id;
                res.send("success");
            }
            else{
                
                res.send("fail");
            }
        }
        res.end();
    });
});


// app.post('/upload', upload.single('userfile'), function(req, res){

//     res.send('Uploaded! : '+req.file);
//     console.log(req.file);
// });



http.createServer(app).listen(port,()=>{
    console.log(`running server http://127.0.0.1:${port}`);
});
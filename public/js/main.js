var good_btn_max=1;
            $(document).ready(function(){
                $.post('/sessionCheck',(res)=>{
                    // $('.login').empty();
                    // if(res=="success"){
                    //     $('.login').attr('id','logout');
                    //     $('.login').append(`로그아웃
                    // <img class='login_img' src="./img/unlock.png">`);
                    // }
                    // else{
                    //     $('.login').attr('id','login');
                    //     $('.login').append(`로그인
                    // <img class='login_img' src="./img/unlock.png">`);
                    // }

                })


                $(window).scroll(function(){
                    if(scrollY>390) $('.page_up').css('visibility','visible');
                    else $('.page_up').css('visibility','hidden'); 
                });

                $(".page_up").click(function(){
                    $('body').scrollTop(0);
                });

                $('.login').click(function(){
                    if($('.login').attr('id')=='login'){
                        location.href="/login.html";
                    }
                    else if($('.login').attr('id')=='logout'){
                        $.post('/logout',()=>{
                            alert("로그아웃 되었습니다.");
                            location.href=location.href;
                        });

                    }
                    
                    

                });



                $(".addBtn").click(function(){
                    var output="";
                    
                for(i=good_btn_max;i<good_btn_max+2;i++){
                    
                     
                    output+='<div class="idea">';
                    output+='<div class="idea_left">';
                    output+='<img class="profile" src="./img/profile.jpg">';
                    output+='<div class="idea_left_state">';
                    output+='<div class="comment_state">';
                    output+='<img class="comment_icon" src="./img/comment.png">';
                    output+='<p class="comment_cnt">0건</p>';
                    output+='</div>';
                    output+='<div class="good_state">';
                    output+='<img class="good_icon" src="./img/good.png">';
                    output+='<p class="good_cnt">0개</p>';
                    output+='</div>';
                    output+='<div class="registration_date_state">';
                    output+='<img class="clock_icon" src="./img/clock.png">';
                    output+='<p class="date">2019-11-18</p>';
                    output+='</div>';
                    output+='</div>';
                    output+='</div>';
                    output+='<div class="idea_right">';
                    output+='<div class="comment">';
                    output+='<a class="comment_text_a" href="http://naver.com">';
                    output+='<p class="comment_text">';
                    output+='실시간 전체 포탈 검색뉴스 순위 위젯/어플요.메인화면에 양분화해서 다음/네이버로 검색어 누르면 관련기사 연동할 수 있게하면 좋겠네요. 같이 구글 검색어 순위까지 보여지면 네이버도 그짓거리 그만두겠죠. 아니면 다이어트가 많은이의 관심사이니 브랜드,제품명 또는 바코드만 입력하면 성분 분석표 뜨게 하는것도...';
                    output+='</p>';
                    output+='</a>';
                    output+='</div>';
                    output+='<div class="good_btn_div">';
                    output+='<button ';
                    output+='style="float:right;margin-top:25px;margin-right:10px;width:50px;height:20px;background-color: orange;box-shadow: 1.5px 1.5px 1.5px 1.5px gray;"';
                    output+='class="good_btn" id="good_btn'+i+'">GOOD</button>';
                    output+='</div>';
                    output+='</div>';
                    output+='</div>';
                }
                
                
                $('.idea_list').append(output).ready(function(){
                    
                    for(var i=good_btn_max;i<good_btn_max+2;i++){
                        $("#good_btn"+i).attr("style","float:right;margin-top:25px;margin-right:10px;width:50px;height:20px;background-color: orange;box-shadow: 1.5px 1.5px 1.5px 1.5px gray;");
                    }
                    good_btn_max=i;
                    var id_temp;
                    
                    $(".good_btn").click(function(){
                        id_temp=$(this).attr('id');
                        $("#"+id_temp).css('box-shadow','none');
                        setTimeout(() => {
                            $("#"+id_temp).css('box-shadow','1px 1px 1px 1px gray');    
                        }, 100);
                    });
                    
                });

                });
                
            });
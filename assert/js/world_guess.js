	// 导航切换
    $('.tit li').click(function() {
        var i = $(this).index();
        $(this).addClass('select').siblings().removeClass('select');
        $('.con li').eq(i).show().siblings().hide();
        $.ajax({
            type:"get",
            url:"../Public/Handler/GetType.ashx",
            data:{
                Type:"ScientificType"
            },
            success:function(data){
                // for( var i = 0 ; i < data.length ; i ++ ){
                   
                // }
                $tab=$(
                    "<div class='tab space' id='tabC'>"+
                      "<div class='countrys'>"+
                           "<div class='every_country'>"+
                                "<div class='bg'>"+
                                    "<div class='country_img'>"+
                                     "<img src='images/country1.png'>"+
                                    "</div>"+
                                    
                                "</div>"+
                               "<p class='country_name'>法国</p>"+
           
                            "</div>"+

                            "<div class='every_country'>"+
                                "<div class='bg'>"+
                                    "<div class='country_img'>"+
                                     "<img src='images/country4.png'>"+
                                    "</div>"+
                                    
                                "</div>"+
                               "<p class='country_name'>巴西</p>"+
                                
                          " </div>"+
                           "<div class='every_country'>"+
                                "<div class='bg'>"+
                                    "<div class='country_img'>"+
                                     "<img src='images/country3.png'>"+
                                    "</div>"+
                                    
                                "</div>"+
                               "<p class='country_name'>加拿大</p>"+
                                
                          "</div>"+

                     "</div>"+
                       "<div class='box2'>"+
                           "<h3>恭喜您</h3>"+
                           "<p>猜对了本届世界冠军！共<span>999</span>人猜对！</p>"+
                           "<p class='fine'>瓜分奖池获得<span class='red_color'>8.88元</span>,已存入钱包！<span class='look'>去查看>></span></p>"+
                           
                     " </div>"+
                  "</div>"
                 );
                $(".champion").append($tab); 
            }
        });
	});
    //开奖状态切换
	$('.nav p').click(function() {
        $(this).addClass('cut').siblings().removeClass('cut');
        // var i=$(this).index();
        // $('.lottery_con>div').eq(i).show().siblings().hide();
        $('.exhibition').hide();
		$('.already').hide();
        var text = $(this).text();
			if(text =="待开奖"){
				$('.exhibition').show();
				$('.already').hide();
			}else if(text =="已开奖"){
				$('.already').show();
				$('.exhibition').hide();
			}

	});
	//选择球队
   $('.countrys').delegate('.every_country','click',function(){
         if($(this).hasClass('on')){
                $(this).removeClass('on');
            }else{
                $(this).addClass('on');
            }        
    })
   // 已开奖无记录
   $('.award').click(function(){
        $('.tips').show();
      setTimeout(function(){
        $('.tips').hide();
      },1500)
      return false;
    })



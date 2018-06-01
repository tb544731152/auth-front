//选择球队
$('.countrys').delegate('.every_country','click',function(){
  var end=true;
  //判断是否选过了
	if($(this).hasClass('on')){
      $('.tips_box').show();
      $('.tips_box p').text('您已经选过该球队了');
      setTimeout(function(){
      	 $('.tips_box').hide();
      },1500)
  

	}else{

	
	$(this).addClass('on');
	var country_length=$('.countrys .on').length;
	//判断选择的球队有没有大于3个、
	if(country_length>3){
	  $(this).removeClass('on');
      $('.tips_box').show();
      $('.tips_box p').text('只能选择三个球队');
      setTimeout(function(){
      	 $('.tips_box').hide();
      },1500)
	}else{        
      //模拟数据 state=1消耗卡参加竞猜 state=0竞猜卡不足 state=2精猜结束了
	    var state=2;
	    if(state==0){
	        $('.card_insufficient').show();
	        $('.mask').show();
	        $('.wrap').addClass('common_screen');
	    }else if(state==1){
	        $('.consume_card').show();
	        $('.mask').show();
	        $('.wrap').addClass('common_screen');
	    }else if(state==2){
          $(this).removeClass('on');
          $('.tips_box').show();
          $('.tips_box p').text('竞猜已经结束了');
          setTimeout(function(){
             $('.tips_box').hide();
          },1500)
      }
	}

   
	}
	
})

   //我知道了
   $('.know').click(function(){
     $('.card_insufficient').hide();
     $('.mask').hide();
     $('.card_get').hide();
     $('.wrap').removeClass('common_screen');
   })
   //去兑换
   $('.exchange').click(function(){
     location.href="";
   })
   //取消
   $('.cancel').click(function(){
      $('.consume_card').hide();
      $('.mask').hide();
      $('.wrap').removeClass('common_screen');
   })
   //确定消耗消耗卡竞猜
    $('.sure_').click(function(){
      $('.consume_card').hide();
      $('.mask').hide();
      $('.wrap').removeClass('common_screen');
      $('.box2').show();
   })

    //活动说明
    $('.rule').click(function(){
        $('.rule_box').show();
        $('.mask').show();
        $('.wrap').addClass('common_screen');
    })
    //活动说明关闭
    $('.rule_close').click(function(){
        $('.rule_box').hide();
        $('.mask').hide();
        $('.wrap').removeClass('common_screen');
    })

     //获取
    $('.get').click(function(){
      $('.mask').show();
      $('.card_get').show();
      $('.wrap').addClass('common_screen');
    })
//选择哪个胜利
$('.tab_box').delegate('.guessing_progress p','click',function(){
	$(this).parents('.guessing_progress').find('p').removeClass('on')
	$(this).addClass('on');	
})

//确认竞猜
$('.tab_box').delegate('.btn','click',function(){
	var id=$(this).parents('.tab').attr('id');
    $('.sure_').attr('data-id',id);
	var guessing_length=$(this).parents('.tab').find('.guessing_progress .on').length;
    if(guessing_length==0){
    	$('.tips_box').show();
    	setTimeout(function(){
    	$('.tips_box').hide();
    	},1500)
    }else{
    	 //模拟数据 state=1消耗卡参加竞猜 state=0竞猜卡不足  
        var state=1;
        if(state==0){
            $('.card_insufficient').show();
            $('.mask').show();
            $('.wrap').addClass('common_screen');
        }else if(state==1){
            $('.consume_card').show();
            $('.mask').show();
            $('.wrap').addClass('common_screen');
        }
    }
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



    //我知道了
   $('.know').click(function(){
     $('.card_insufficient').hide();
      $('.card_get').hide();
     $('.mask').hide();
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
       var data_id=$(this).attr('data-id');
      $('#'+data_id).find('.sure_box').hide();
      $('#'+data_id).find('.find').show();
     
   })
    //获取
    $('.get').click(function(){
      $('.mask').show();
      $('.card_get').show();
      $('.wrap').addClass('common_screen');
    })
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
    
   //选择球队
   $('.countrys').delegate('.every_country','click',function(){
           if($(this).hasClass('on')){
                $(this).removeClass('on');
            }else{
                $(this).addClass('on');
            } 
           var nums=$(this).parents('.countrys').find('.on').length; 
           if(nums>2){
             $(this).removeClass('on');
                 $('.tips_box').show();
               setTimeout(function(){
                  $('.tips_box').hide();
               },1500)
           } 
    })
   //确认参加竞猜
   $('.btn').click(function(){
      var id=$(this).parents('.tab').attr('id');
      $('.sure_').attr('data-id',id);
      var nums=$(this).parents('.tab').find('.on').length;
      if(nums<2){
        $('.tips_box').show();
         setTimeout(function(){
            $('.tips_box').hide();
         },1500)
      }else{
        //模拟数据 state=1消耗卡参加竞猜 state=0竞猜卡不足  
        var state=0;
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
      $('#'+data_id).find('.btn').hide();
      $('#'+data_id).find('.box2').show();
   })
    //获取
    $('.get').click(function(){
      $('.mask').show();
      $('.card_get').show();
      $('.wrap').addClass('common_screen');
    })
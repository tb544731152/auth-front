$('footer p').click(function(){
      $('.mask').show();
      $('.share_img').show();
      $('.wrap').addClass('common_screen');
    })
    $('.mask').click(function(){
       $('.grow_box').hide();
       $('.mask').hide();
       $('.share_img').hide();
       $('.wrap').removeClass('common_screen');
    })

    setTimeout(function(){
        $('.tips').hide();
    },1500)

    $('.img2,.img3,.img4,.img5').click(function(){
        $('.tips').text('活动即将开启');
        $('.tips').show();
      setTimeout(function(){
        $('.tips').hide();
      },1500)
      return false;
    })

    $('.img1').click(function(){
        return false;
    })

    //活动说明
    $('.rule').click(function(){
      $('.mask').show();
      $('.grow_box').show();
      $('.wrap').addClass('common_screen');
    })
    //活动说明关闭
     $('.btn_bg').click(function(){
      $('.mask').hide();
      $('.grow_box').hide();
      $('.wrap').removeClass('common_screen');
    })
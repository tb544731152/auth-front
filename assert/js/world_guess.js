	$('.tit li').click(function() {
        var i = $(this).index();
        $(this).addClass('select').siblings().removeClass('select');
        $('.con li').eq(i).show().siblings().hide();
	});
	$('.nav p').click(function() {
        $(this).addClass('cut').siblings().removeClass('cut');
        // $('.lottery_con div').eq(i).show().siblings().hide();
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

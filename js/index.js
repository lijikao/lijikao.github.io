

$(function(){
    var str = null,url=null;
    $('.contact .contact-menu li').hover(function(){
        str =  $(this).find('span').attr("data-p");
        url = './resources/images/contact-icon-' + str.substring(str.length-7,str.length-11)  + '-img.svg';
        $(this).siblings().find('a').removeClass('active');
        $(this).find('a').addClass('active');
        $(this).closest('.contact-menu').siblings('.section-content').attr("data-index",$(this).index());
        $(this).find('span').css('background-image',$(this).find('span').attr("data-h"));
        $(this).siblings().eq(0).find('span').css('background-image', $(this).siblings().eq(0).find('span').attr("data-p"))
        $(this).siblings().eq(1).find('span').css('background-image', $(this).siblings().eq(1).find('span').attr("data-p"))
        $(this).siblings().eq(2).find('span').css('background-image', $(this).siblings().eq(2).find('span').attr("data-p"))
        $(this).siblings().eq(3).find('span').css('background-image', $(this).siblings().eq(3).find('span').attr("data-p"))
       
        $(this).closest('.section-content').siblings().find('img').attr('src',url);
    },function(){
    })
}) 

$(function(){
    $(window).scroll(function(){
        var no_scroll = $("#no_scroll");

        //    获取视口高度
        if(no_scroll.length == 0){
            windowHeight = $(window).height();
            windowScrollPosition = $(window).scrollTop();
            bottomScrollPosition = windowHeight + windowScrollPosition;
                    if($('.top_header').offset().top > 80){
                        $(".top_header").addClass("top_bg");
                    }else{
                        $(".top_header").removeClass("top_bg");
                    }
        }else{
            $(".top_header").addClass("top_bg");
        }
  
});
})






//# sourceMappingURL=../../_map/js/common/index.js.map

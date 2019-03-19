$(function() {
    //监听顶部导航开合按钮点击事件
    var leftNavActive = true;
    $('.phone-header').on('click', '.phone-open-nav-btn', function () {
        if(leftNavActive){
            $(".phone-nav-box").animate({left:"0"});
            $(".perfree-content").animate({left:"200px"});
            leftNavActive = false;
        }else{
            $(".phone-nav-box").animate({left:"-200px"});
            $(".perfree-content").animate({left:"0"});
            leftNavActive = true;
        }
    });

    //监听顶部设置按钮点击事件
    var headerActive = true;
    $('.phone-header').on('click', '.phone-setting-btn', function () {
        if(headerActive){
            $(".phone-setting-box").slideDown();
            headerActive = false;
        }else{
            $(".phone-setting-box").slideUp();
            headerActive = true;
        }
    });
});
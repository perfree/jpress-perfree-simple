$(function() {
    var leftNavActive = true;
    //监听顶部导航开合按钮点击事件
    $('.phone-header').on('click', '.phone-open-nav-btn', function () {
        console.log(leftNavActive);
        if(leftNavActive){
            openNav();
        }else{
            closeNav();
        }
    });

    $('body').on('click', '.mask', function () {
        closeNav();
    });

    $('.phone-nav-box').on('click', '.nav-link', function () {
        closeNav();
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
    function closeNav() {
        leftNavActive = true;
        $(".mask").hide()
        $(".perfree-content").animate({left:"0"},"fast");
        $(".phone-nav-box").animate({left:"-200px"},"fast");
    }

    function openNav() {
        leftNavActive = false;
        $(".mask").show()
        $(".phone-nav-box").animate({left:"0"},"fast");
        $(".perfree-content").animate({left:"200px"},"fast");
    }
});
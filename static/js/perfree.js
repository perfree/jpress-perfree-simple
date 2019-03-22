$(function() {
    //监听顶部导航开合按钮点击事件
    var leftNavActive = true;
    $('.phone-header').on('click', '.phone-open-nav-btn', function () {
        if(leftNavActive){
            openNav();
            leftNavActive = false;
        }else{
            closeNav();
            leftNavActive = true;
        }
    });

    $('body').on('click', '.mask', function () {
        closeNav();
    });

    $('.phone-nav-box').on('click', 'a', function () {
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
});
function closeNav() {
    $(".mask").hide()
    $(".phone-nav-box").animate({left:"-200px"});
    $(".perfree-content").animate({left:"0"});
}

function openNav() {
    $(".mask").show()
    $(".phone-nav-box").animate({left:"0"});
    $(".perfree-content").animate({left:"200px"});
}
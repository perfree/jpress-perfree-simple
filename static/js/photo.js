layer.photos({
    photos: '.perfree-img-parent',
    anim: 5
});
layui.use(['form'], function(){
    var form = layui.form;
    form.on('submit(checkPhoto)', function(data) {
        $.post("/photo/getPhoto", data.field, function (result) {
            if (result.state == 'ok') {
                var html = '<div class="layui-card-header article-title">' +
                    '<h2>' + result.photo.name + '</h2>' +
                    '<p>' +
                    '<span><i class="fa fa-user-o"></i> ' + result.photo.nickname + '</span>' +
                    '<span>&nbsp;&nbsp;<i class="fa fa-clock-o"></i> ' + result.photo.createTime + '</span>' +
                    '</p>' +
                    '</div>' +
                    '<div class="layui-card-body article-body">' +
                    '<div class="perfree-article-content">' +
                    '<div class="perfree-img-parent">';
                for (var i = 0; i < result.photo.photos.length; i++) {
                    html += '<div class="photo-box">' +
                        '<img src="' + result.photo.photos[i] + '">' +
                        '</div>';
                }
                html += '</div></div></div>';
                $(".photo-card").html(html);
                layer.photos({
                    photos: '.perfree-img-parent',
                    anim: 5
                });
            } else {
                layer.msg(result.message, {icon: 2});
            }
        });
        return false;
    });
});
$(document).on("mousewheel DOMMouseScroll", ".layui-layer-phimg img", function(e) {
    var delta = (e.originalEvent.wheelDelta && (e.originalEvent.wheelDelta > 0 ? 1 : -1)) || // chrome & ie
        (e.originalEvent.detail && (e.originalEvent.detail > 0 ? -1 : 1)); // firefox
    var imagep = $(".layui-layer-phimg").parent().parent();
    var image = $(".layui-layer-phimg").parent();
    var h = image.height();
    var w = image.width();
    if(delta > 0) {
        if(h < (window.innerHeight)) {
            h = h * 1.05;
            w = w * 1.05;
        }
    } else if(delta < 0) {
        if(h > 100) {
            h = h * 0.95;
            w = w * 0.95;
        }
    }
    imagep.css("top", (window.innerHeight - h) / 2);
    imagep.css("left", (window.innerWidth - w) / 2);
    image.height(h);
    image.width(w);
    imagep.height(h);
    imagep.width(w);
});
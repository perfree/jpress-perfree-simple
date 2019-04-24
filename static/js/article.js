//加载代码高亮js
loadscript("/templates/jpress-perfree-simple/static/plugin/highlight/highlight.pack.js",function () {
    hljs.initHighlighting();
});
//加载js
function loadscript(url, callback){
    var script = document.createElement ("script")
    script.type = "text/javascript";
    if (script.readyState){
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" || script.readyState == "complete"){
                script.onreadystatechange = null;
                callback();
            }
        };
    } else {
        script.onload = function(){
            callback();
        };
    }
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
}
layui.config({
    base: '/templates/jpress-perfree-simple/static/plugin/layuinotice/'
});
layui.use(['element','layedit','form','layer','jquery'], function() {
    var element = layui.element,layedit = layui.layedit,form=layui.form,layer=layui.layer,$=layui.jquery;
    //实例化编辑器
    var edit = layedit.build('revert', {
        tool: ['strong','italic','underline','del','link', 'face'],
        height: 100
    });

    //利用表单验证将编辑器值赋予textarea
    form.verify({
        content: function(value, item) {
            layedit.sync(edit);
        }
    });
    var pRevertContent,pRevertAuthor,pRevertCreated,pRevertAvatar;
    //监听回复按钮点击事件
    $('#allComment').on('click','.toReply', function () {
        $('#pid').val($(this).attr('data-cid'));
        $('#revert').val('回复 @' + $(this).attr('data-author') + " ：");
        edit = layedit.build('revert', {
            tool: ['strong','italic','underline','del','link', 'face'],
            height: 100
        });
        //记录父级评论内容
        pRevertContent = $(this).siblings(".revert-content").text();
        pRevertAuthor = $(this).siblings(".revert-user").children(".revert-user-msg").children(".revert-user-name").text();
        pRevertCreated = $(this).siblings(".revert-user").children(".revert-user-msg").children(".revert-user-time").text();
        pRevertAvatar = $(this).siblings(".revert-user").children("img").attr("src");
        $('#revert').focus();
    });

    //监听form提交
    form.on('submit(comment)', function(data){
        var content = layedit.getContent(edit);
        if(content == null || content == "" || content == undefined){
            alert('请填写评论内容');
            return false;
        }
        var captcha = $(".captcha").val();
        var str = '回复 @' + $(".toReply").attr('data-author') + " ：";
        var revertContent = $("#revert").val();
        //判断回复是否存在
        if(!new RegExp(str).test(revertContent)){
            $('#pid').val('');
        }else {
            revertContent = revertContent.replace(str,'');
        }
        $.post({
            url:"/article/postComment",
            data: {articleId:$("#articleId").val(),pid: $("#pid").val(),content: revertContent,captcha:captcha},
            success:function(result){
                if(result.state == "ok"){
                    console.log(result);
                    var avatarUrl;
                    var author;
                    if(result.user != null){
                        avatarUrl = result.user.avatar;
                        author = result.comment.author;
                    }else {
                        avatarUrl = "/templates/jpress-perfree-simple/static/img/avatar.png";
                        author = "匿名用户";
                    }
                    //清空编辑器
                    layedit.clearContent(edit);
                    var pid = $("#pid").val();
                    //追加html
                    var html = '<div class="revert-content-box">' +
                        '<div class="revert-user">' +
                        '<img src="'+avatarUrl+'" width="40px" height="40px"/>' +
                        '<span class="revert-user-msg">' +
                        '<span class="revert-user-name">'+author+'</span>' +
                        '<br>' +
                        '<span class="revert-user-time">'+result.comment.created+'</span>' +
                        '</span>' +
                        '</div>' +
                        '<div class="revert-content">'+result.comment.text+'</div>';
                    if(pid != ''){
                        html += '<div class="revert-comment-content-box">' +
                            '<div class="revert-user">' +
                            '<img src="'+pRevertAvatar+'" width="40px" height="40px"/>' +
                            '<span class="revert-user-msg">' +
                            '<span class="revert-user-name">'+pRevertAuthor+'</span>' +
                            '<br>' +
                            '<span class="revert-user-time">'+pRevertCreated+'</span>' +
                            '</span>' +
                            '</div>' +
                            '<div class="revert-content">'+pRevertContent+'</div>' +
                            '</div>';
                    }
                    html += '<a class="toReply" href="javascript:;" data-cid="'+result.comment.id+'" data-author="'+author+'">回复</a>'+
                        '</div> <hr class="layui-bg-gray">';
                    $("#allComment").prepend(html);
                    $(".captcha").val("");
                    $(".comment-verify").attr("src",'/commons/captcha?d='+Math.random());
                }else{
                    alert('评论失败:' + result.message);
                    $(".captcha").val("");
                    $(".comment-verify").attr("src",'/commons/captcha?d='+Math.random());
                    if (data.errorCode == 9) {
                        location.href = '/user/login';
                    }
                }
                return false;
            },
            error:function () {
                alert('网络错误，请稍后重试');
                $(".captcha").val("");
                $(".comment-verify").attr("src",'/commons/captcha?d='+Math.random());
                return false;
            }
        });
        return false;
    });
});
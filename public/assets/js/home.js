//向服务器端发送请求 索要最新发布数据
$.ajax({
    type: 'get',
    url: 'http://47.111.184.55:3000/posts/lasted',
    success: function(response) {
        console.log(response);
        var html = template('lastedTpl', { response: response })
        $('#lastedBox').html(html)

    }
})
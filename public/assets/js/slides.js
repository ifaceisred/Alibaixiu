//当管理选择文件的时候
$('#file').on('change', function() {
        //用户选择得文件
        var file = this.files[0];
        //创建formData对象实现二进制文件上穿
        var formData = new FormData();
        //将管理员选择到得文件添加到formData对象中
        formData.append('image', file);
        //向服务器端发送请求 实现图片的上传
        $.ajax({
            type: 'post',
            url: 'http://47.111.184.55:3000/upload',
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                console.log(response[0].image);
                $('#image').val(response[0].image)
            }
        })
    })
    //当萝卜图表单发生提交行为时
$('#slidesForm').on('submit', function() {
    //获取管理员在表单中输入得内容
    var formData = $(this).serialize()
        //向服务器端发送请求 添加萝卜图数据 此时页面中还木有显示 但是数据库中已经添加成功了
    $.ajax({
        type: 'post',
        url: 'http://47.111.184.55:3000/slides',
        data: formData,
        sussess: function(response) {
            //刷新显示最新的数据
            location.reload()
        }
    })

    //阻止表单默认提交行为
    return false
})

//向服务器发送请求 索要图片萝卜列表数据
$.ajax({
    type: 'get',
    url: 'http://47.111.184.55:3000/slides',
    success: function(response) {
        // console.log(response);
        var html = template('slidesTpl', { response: response })
        $('#slidesParent').html(html)
    }
})

//删除萝卜图
$('#slidesParent').on('click', '.delete', function() {
    if (confirm('真的要删?')) {
        var id = $(this).attr('response-id')
        alert(id)
        $.ajax({
            type: 'delete',
            url: `http://47.111.184.55:3000/slides/${id}`,
            success: function() {
                location.reload()
                console.log('delete success')
            }
        })
    }

})
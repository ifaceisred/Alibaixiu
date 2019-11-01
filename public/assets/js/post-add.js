$(function() {
    //获取文章分类数据
    $.ajax({
        url: 'http://47.111.184.55:3000/categories',
        type: 'get',
        success: function(response) {
            // console.log(response);
            var html = template('categoryTpl', { response: response })
                // console.log(html);
            $('#category').html(html)
        }
    })

    //当管理员选择文件时 出发事件
    $('#feature').on('change', function() {
        //获取到管理员选择到的文件
        var file = this.files[0]
            //创建formdata对象 实现二进制文件上床
        var formData = new FormData();
        console.log(formData);

        //将管理员选择到得文件追加到formdata对象中去
        formData.append('cover', file)
        $.ajax({
            type: 'post',
            url: 'http://47.111.184.55:3000/upload',
            data: formData,
            //告诉ajax方法不要处理data属性对应得参数
            processData: false,
            //告诉ajax方法不要设置参数类型
            contentType: false,
            success: function(response) {
                console.log(response);
                $('#thumbnail').val(response[0].cover)

            }
        })
    })

    //当添加文章表单提交得时候
    $('#addForm').on('submit', function() {
        //获取管理员在表单中输入的内容
        var formData = $(this).serialize();
        //向服务器端发送请求 实现添加文章功能
        $.ajax({
            type: 'post',
            url: 'http://47.111.184.55:3000/posts',
            data: formData,
            success: function() {
                //文章添加成功 跳转到文章列表页面
                location.href = './posts.html'
            }
        })
        return false;
    })
})
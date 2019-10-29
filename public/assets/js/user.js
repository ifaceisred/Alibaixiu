$('#userForm').on('submit', function() {
    //获取到用户再表单中输入的内容并将内容格式化成参数字符串
    var formData = $(this).serialize();
    console.log(formData);

    //向服务器端发送添加用户的请求。
    $.ajax({
            type: 'post',
            url: 'http://47.111.184.55:3000/users',
            data: formData,
            success: function(data) {
                console.log(data);

                //刷新页面
                location.reload();
            },
            error: function() {
                alert('用户添加失败')
            }
        })
        //代码在上线阶段，把项目中的console log以及alert全部去掉
        //因为会引发xss攻击

    //阻止表单的默认提交行为哦
    return false;
})


//当用户选择文件的时候
$('#avatar').on('change', function() {
    // console.log(this.files[0]);
    //用户选择到的文件
    //this.files[0]
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post',
        url: 'http://47.111.184.55:3000/upload',
        data: formData,
        //告诉ajax方法不要解析请求参数
        processData: false,
        //告诉ajax方法不要设置请求参数的类型
        contentType: false,
        success: function(response) {
            var imgData = 'http://47.111.184.55:3000' + response[0].avatar
            console.log(response[0].avatar);
            // console.log(data[0].avatar);
            console.log(response);
            //在请求成功后的回调函数中，过去到头像的地址，同时赋值给页面的image
            $('#preview').attr('src', imgData)
                //创建隐藏域，把回调函数中的返回的地址赋值给隐藏域
            $('#avatarHidden').val(response[0].avatar)

        },
        error: function() {
            alert('Photo upload failed')
        }
    })

})
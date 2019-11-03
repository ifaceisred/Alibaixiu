//当管理员选择logo图片时
$('#logo').on('change', function() {
    //获取管理员选择的图片
    var file = this.files[0];
    //创建对象 实现二进制上传文件
    var formData = new FormData();
    //将管理员选择带的文件添加到对象中 利用append方法
    formData.append('logo', file);
    //向服务器端发送请求 实现文件的上传
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
            $('#logoman').val(response[0].logo)
                //将logo图片显示在页面中
            $('#preview').attr('src', response[0].logo)
        }
    })
})

//当网站设置表单发生提交行为时
$('#settingsForm').on('submit', function() {
    //获取管理员在表单中输入的内容 
    var formData = $(this).serialize()
        //向服务端发送请求 实现网站设置数据添加
    $.ajax({
            type: 'post',
            url: 'http://47.111.184.55:3000/settings',
            data: formData,
            success: function() {
                location.reload()
            }
        })
        //阻止表单默认提交行为
    return false
})
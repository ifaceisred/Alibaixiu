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

//403---一般是参数错了，这时候看参数 单词
//404---说明地址接口或者参数错了，优先检查接口地址，然后是参数
//304---忽略，说明是从本地缓存中读取文件
//5xx---服务器错了

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

$.ajax({
    type: 'get',
    url: 'http://47.111.184.55:3000/users',
    success: function(response) {
        // console.log(response);
        var html = template('userTpl', { response: response });
        $('#userBody').html(html)

    }

})

//用户编辑功能1
//使用事件委托的形式给编辑按钮绑定事件，获取唯一的值id
//根据id发送ajax请求，获取所要更改的用户信息
//将信息展示到左侧
//开始更新数据，发送ajax，然后点击保存按钮，从新刷新页面
$('#userBody').on('click', '.edit', function() {
    var id = $(this).attr('response-id');
    // consol  e.log(id);
    $.ajax({
        url: `http://47.111.184.55:3000/users/${id}`,
        type: 'put',
        success: function(response) {
            // console.log(response);
            var html = template('modfitTpl', response)
            $('#userForm').html(html)

        }
    })

})

//用户编辑功能2 同步到服务器

$('avatar').on('submit', '#userForm', function() {
    var parmas = $(this).serialize()
    var id = $(this).attr('response-id');
    $.ajax({
        type: 'put',
        // url: 'http://47.111.184.55:3000/users' + id,
        url: `http://47.111.184.55:3000/users/${id}`,
        data: parmas,
        success: function(response) {
            //修改用户成功，重新加载页面
            location.reload()
        }
    })
})

//删除用户
$('#userBody').on('click', '.delete', function() {
    var id = $(this).attr('response-id')
    if (confirm('你将释放大招')) {
        $.ajax({
            url: `http://47.111.184.55:3000/users/${id}`,
            type: 'delete',
            success: function(response) {
                location.reload()
            }
        })
    }
})

//全选与反选

//获取批量删除按钮
var deleteMany = $('#deleteMany')

//获取全选反选按钮
var checkedAll = $('#checkedAll')

//1.点击全选按钮，决定全选与反选
checkedAll.on('change', function() {
    //使用prop获取当前全选按钮的状态
    var status = $(this).prop('checked');

    if (status) {
        //展示批量删除按钮
        deleteMany.show()
    } else {
        //隐藏批量删除按钮
        deleteMany.hide()

    }

    //获取所有小的复选框，并讲全选按钮的状态使用prop赋值给每个小的复选框
    $('#userBody').find('.findOne').prop('checked', status)

})

//2.使用事件委托给每个小的复选框绑定change事件
$('#userBody').on('change', '.findOne', function() {
    //获取所有的用户
    var inputs = $('#userBody').find('.findOne')
        //当用户的数量与复选框勾选的数量一致，说明是全选，否则就不是选择
        //如果数量相等，那么让全选按钮勾上，否则，取消全选按钮勾选
    if (inputs.length === inputs.filter(':checked').length) {
        checkedAll.prop('checked', true)
    } else {
        checkedAll.prop('checked', false)
    }
    if (inputs.filter(':checked').length > 0) {
        //展示批量删除按钮
        deleteMany.show()
    } else {
        //隐藏批量删除按钮
        deleteMany.hide()
    }
})

//为批量删除按钮添加点击事件
deleteMany.on('click', function() {
    var ids = [];
    //获取选中的用户
    var checkedUser = $('#userBody').find('input').filter(':checked')
        //循环复选框 从复选框元素的身上过去data-id实行的值
    checkedUser.each(function(index, element) {
        ids.push($(element).attr('response-id'))
    });

    if (confirm('Are you ready?')) {
        $.ajax({
            type: 'delete',
            url: 'http://47.111.184.55:3000/users/' + ids.join('-'),
            success: function() {
                location.reload();
                alert('Delete success')
            }
        })
    }
})
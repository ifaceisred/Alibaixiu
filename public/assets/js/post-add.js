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


    // console.log(getUrlParams('id'));
    var id = getUrlParams('id')

    //从浏览器得地址栏中获取查询参数
    function getUrlParams(name) {
        var paramsAry = location.search.substr(1).split('&');
        for (var i = 0; i < paramsAry.length; i++) {
            var tmp = paramsAry[i].split('=')
            if (tmp[0] == name) {
                return tmp[1]
            }
        }
        return -1
    }
    if (id != -1) {
        $.ajax({
            type: 'get',
            url: `http://47.111.184.55:3000/posts/${id}`,
            success: function(response) {

                //这里需要再次获取分类列表
                //因为后台返回的只有文章分类，并没有所有得分类
                $.ajax({
                    type: 'get',
                    url: 'http://47.111.184.55:3000/categories',
                    success: function(categories) {
                        console.log(response);
                        //将获取到的所有分类数据添加到文章数据中
                        //是为了方便对页面进行分类遍历，渲染
                        response.categories = categories
                        var html = template('modifyTpl', response);
                        // console.log(html);
                        $('#parentBox').html(html)
                    }
                })
            }
        })
    }
    //实现编辑后，同步到数据库
    //当修改文章信息表单发送提交行为得时候
    $('#parentBox').on('submit', '#modifyForm', function() {
        //获取管理员在表单中输入的内容
        var formData = $(this).serialize();
        //获取管理员正在修改的文章得id值
        var id = $(this).attr('response-id');
        $.ajax({
            type: 'put',
            url: `http://47.111.184.55:3000/posts/${id}`,
            data: formData,
            success: function() {
                location.href = './posts.html'
            }
        })
        return false
    })
})
$(function() {
    $('#addCategory').on('submit', function() {
        var formData = $(this).serialize()
        console.log(formData);
        $.ajax({
            type: 'post',
            url: 'http://47.111.184.55:3000/categories',
            data: formData,
            success: function() {
                location.reload()
                    // console.log(response);
            }
        })
        return false
    })
    $.ajax({
        type: 'get',
        url: 'http://47.111.184.55:3000/categories',
        success: function(response) {
            // console.log(response);
            var html = template('categoryListTpl', { response: response })
            $('#categoryBox').html(html)
        }
    })

    //为编辑按钮添加点击事件
    $('#categoryBox').on('click', '.edit', function() {
        var id = $(this).attr('response-id')
        $.ajax({
            type: 'get',
            url: 'http://47.111.184.55:3000/categories/' + id,
            success: function(response) {
                // console.log(response);
                var html = template('modifyCategoryTpl', response)
                $('#formBox').html(html)

            }
        })
    })


    $('#formBox').on('submit', '#modifyCategory', function() {
        var formData = $(this).serialize();
        var id = $(this).attr('response-id');
        $.ajax({
            type: 'put',
            url: 'http://47.111.184.55:3000/categories/' + id,
            data: formData,
            success: function() {
                location.reload()
            }
        })
        return false

    })

    //当删除按钮被点击时
    $('#categoryBox').on('click', '.delete', function() {
        if (confirm('你要放大招么')) {
            //获取要删除的分类数据id
            var id = $(this).attr('response-id')
                //向服务器发送请求，删除分类数据
            $.ajax({
                type: 'delete',
                url: 'http://47.111.184.55:3000/categories/' + id,
                success: function() {
                    location.reload()
                    alert('大招冷却中')
                }
            })
        }
    })

    return false

})
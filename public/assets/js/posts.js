//向服务器发送请求 获取文章列表数据
$.ajax({
    type: 'get',
    url: 'http://47.111.184.55:3000/posts',
    success: function(response) {
        // console.log(response);
        var html = template('postsTpl', response)
        console.log(html);
        $('#postsBox').html(html);
        var page = template('pageTpl', response)
        $('#page').html(page)
    }
})

//处理日期时间格式
function formateDate(date) {
    //将日期时间字符串转换成日期对象
    date = new Date(date)
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    template.defaults.imports.formateDate = formateDate
}
//分页
function changePage(page) {
    // alert(page)
    $.ajax({
        type: 'get',
        url: 'http://47.111.184.55:3000/posts',
        data: {
            page: page
        },
        success: function(response) {
            // console.log(response);
            var html = template('postsTpl', response)
            console.log(html);
            $('#postsBox').html(html);
            var page = template('pageTpl', response)
            $('#page').html(page)
        }
    })
}
//向服务器端发送请求 索要分类数据
$.ajax({
    type: 'get',
    url: 'http://47.111.184.55:3000/categories',
    success: function(response) {
        console.log(response);
        var html = template('categoryTpl', { response: response })
        console.log(html);
        $('#categoryBox').html(html)

    }
})

//当用户进行文章列表帅选的时候
$('#filterForm').on('submit', function() {
    // alert(1)
    var formData = $(this).serialize();
    console.log(formData);
    $.ajax({
        type: 'get',
        url: 'http://47.111.184.55:3000/posts',
        data: formData,
        success: function(response) {
            // console.log(response);
            var html = template('postsTpl', response)
            console.log(html);
            $('#postsBox').html(html);
            var page = template('pageTpl', response)
            $('#page').html(page)
        }
    })

    //阻止表单默认提交行为
    return false
})
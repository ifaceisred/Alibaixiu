//请求文章得数量
$.ajax({
    type: 'get',
    url: 'http://47.111.184.55:3000/posts/count',
    success: function(response) {
        console.log(response);
        $('#post').html('<strong>' + response.postCount + '</strong>篇文章（<strong>' + response.draftCount + '</strong>篇草稿）')
    }
})

//请求分类得数量
$.ajax({
    type: 'get',
    url: 'http://47.111.184.55:3000/categories/count',
    success: function(response) {
        console.log(response);
        $('#cate').html('<strong>' + response.categoryCount + '</strong>个分类')
    }
})

//请求评论的数量
$.ajax({
    type: 'get',
    url: 'http://47.111.184.55:3000/comments/count',
    success: function(response) {
        console.log(response);
        $('#comment').html('<strong>' + response.commentCount + '</strong>条评论（<strong>0</strong>条待审核）')
    }
})
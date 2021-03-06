 $.ajax({
     url: 'http://47.111.184.55:3000/posts/recommend',
     success: function(response) {
         console.log(response);
         //为了将模板变成公共的 所以将模板写在了js文件中
         var recommendTpl = `
         {{each response}}
         <li>
            <a href="/detail.html?id={{$value._id}}">
                <img src="http://47.111.184.55:3000{{$value.thumbnail}}" alt="">
                <span>{{$value.title}}</span>
            </a>
        </li>
        {{/each}}
         `;
         var html = template.render(recommendTpl, { response: response })
             //将拼接好的热门推荐数据显示在了页面中
         $('#recommendBox').html(html)
     }
 })
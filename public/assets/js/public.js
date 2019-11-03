//数据管理展示公共页面
//向服务器端发送请求 索要随机推荐数据
$.ajax({
    type: 'get',
    url: 'http://47.111.184.55:3000/posts/random',
    success: function(response) {
        console.log(response);
        var randomTpl = `
        {{each response}}
        <li>
            <a href="detail.html?id={{$value._id}}">
                <p class="title">废灯泡的14种玩法 妹子见了都会心动</p>
                <p class="reading">阅读(819)</p>
                <div class="pic">
                    <img src="uploads/widget_1.jpg" alt="">
                </div>
            </a>
            </li>
        {{/each}}
        `;
    }
})
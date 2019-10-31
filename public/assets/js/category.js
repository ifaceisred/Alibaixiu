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
    return false
})
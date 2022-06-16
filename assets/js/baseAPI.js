$(function(){
    // options 是每次调用 ajax 请求时，能够得到的配置对象，不如请求方法，请求路径，请求数据等

    // 拿到 URL 数据后，重新对 URL 进行拼接，加上根路径，再重新赋值给 options.url
    $.ajaxPrefilter(function(options){
        options.url = "http://www.liulongbin.top:3007"+options.url

        // 统一为有权限的接口，设置 headers 请求头
        if(options.url.indexOf('/my/') !== -1){
            options.headers={
                Authorization:localStorage.getItem('token') || ''
    
            }
        }

        options.complete = function(res){
            if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
                localStorage.removeItem('token')
                location.href = '/素材/login.html'
            }
        }
        
    })
})
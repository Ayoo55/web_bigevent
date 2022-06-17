$(function(){
    getUserInfo()

    let layer = layui.layer
    // 点击退出
    $('.btnLogout').on('click',function(){
        layer.confirm('确认退出登录？', {icon: 3, title:'提示'}, function(index){
            // 清空本地存储的token
            localStorage.removeItem('token')
            // 跳转登录页面
            location.href = '/素材/login.html'
            // 关闭 confirm 询问框
            layer.close(index)

          });
        
    })

})


// 获取用户信息
function getUserInfo(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token') || ''
        // },
        success:function(res){
            if(res.status !== 0){
                return layui.layer.msg('获取信息失败')
            }
            // 渲染头像,调用函数
            renderAvatar(res.data)
        },
        // 不论是成功还是失败，最终都会调用 complete 函数
        // 写到 baseAPI 中
        // complete:function(res){
        //     // console.log(res);
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
        //         localStorage.removeItem('token')
        //         location.href = '/素材/login.html'
        //     }
        // }

    })
}


// 渲染头像
function renderAvatar(user){
    // 获取用户姓名
    let username = user.nickname || user.username
    // 设置欢迎的文本内容
    $('.welcome').html('欢迎 &nbsp'+username)
    // 渲染图片头像
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src',user.user_pic).show()
        $('.text-avatar').html(first).hide()
    }
    // 渲染文本头像
    else{
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
          .html(first)
          .show()

    }

}
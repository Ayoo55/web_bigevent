$(function(){
    // 点击去注册账号，显示注册页面
    $('.alogin').on('click',function(){
        $('.loginBox').hide()
        $('.regBox').show()
    })

    // 点击去登录账号，显示登录页面
    $('.areg').on('click',function(){
        $('.loginBox').show()  
        $('.regBox').hide()
    })


    let form = layui.form
    let layer = layui.layer
    form.verify({
        pwd:[
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
        ] ,
        repwd:function(value){
            let v = $('.regBox [name=password]').val()
            if(v !== value){
                return "密码不一致"
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        let username = $('#form_reg [name=username]').val()
        let password = $('#form_reg [name=password]').val()
        let data = {username:username,password:password}
        $.post('/api/reguser',data,function(res){
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            $('.links .areg').click()
        })
    })

    // 监听登录表单的提交事件

    $('#form_login').on('submit',function(e){
        // 阻止默认行为
        e.preventDefault()
        // 提交post请求
        $.ajax({
            url:'/api/login',
            method:'post',
            // 获取表单所有数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status !== 0){
                    return layer.msg('登录失败')                   
                }
                layer.msg('登录成功')
                // 储存重要的token信息
                localStorage.setItem('token',res.token)
                // 跳转页面
                location.href="/素材/index.html"
            }
        })
    })

})


$(function () {
  // 点击去注册账号
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })


  //click login
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()

  })
  let form = layui.form
  let layer = layui.layer
  form.verify({
    'pwd': [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    'repwd': function (value) {
      //通过value拿到确认密码框的值,通过pwd拿到密码框的值
      let pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {

        return '两次密码不一致'
      }
    }
  })

  //监听注册表单
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()//阻止表单默认提交行为
    let data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }
    $.post('http://www.liulongbin.top:3007/api/reguser', data, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功,请登录')
      //模拟点击行为
      $('#link_login').click()
    })

  })
  //监听刚登录表单的提交文件
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      url: 'http://www.liulongbin.top:3007/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          //layer.msg是layer身上的方法,已经封装好直接调用
          return layer.msg('登录失败')
        }
        layer.msg('登录成功')
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
      }

    })

  })


})
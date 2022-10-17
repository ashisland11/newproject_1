$.ajaxPrefilter(function (options) {

  // options.url = `http://www.liulongbin.top:3007${options.url}`
  //打印出来是重复拼接
  console.log(options.url)
})
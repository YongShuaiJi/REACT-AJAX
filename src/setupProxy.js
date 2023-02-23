const {createProxyMiddleware} = require('http-proxy-middleware')

module.exports = function(app){
    app.use(
        createProxyMiddleware('/api',{ // 遇见/api 前缀的请求，就出发改配置，是一个拦截器的标识
            target:'http://localhost:8080', // 请求目标，请求转发给谁
            changeOrigin: true, // 控制服务器收到的请求头中的host 字段的值
            pathRewrite:{'^/api':''} // 重写请求路径 用来替换url 中的值
        }),
        // 第二种写法
        proxy('apitest', {
            target:'http://localhost:8080', // 请求目标，请求转发给谁
            changeOrigin: true, // 控制服务器收到的请求头中的host 字段的值
            pathRewrite:{'^/api':''} // 重写请求路径 用来替换url 中的值
        })
    )
}

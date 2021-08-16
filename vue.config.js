/*
 * 配置文件
 * 配置端口号和代理
 */
module.exports = {
    devServer: {
        port: 80,
        proxy: {
            '/api': {
                target: 'http://10.177.47.192:5000',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            }
        }
    },

}

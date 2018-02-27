var path = require('path'); //因为有些配置必须是绝对路径,导入该模块进行处理
var HtmlWebpackPlugin = require('html-webpack-plugin') //webpack中所有的插件都需要导入后,进行使用

//导出webpack工具运行时所需的配置对象
module.exports = {
    // 入口文件
    entry: './src/main.js',

    // 输出文件配置
    output: {
        // 输出的路径，webpack2起就规定必须是绝对路径
        path: path.join(__dirname, 'dist'),
        // 静态资源在服务器上运行时的访问路径，可以直接http://localhost:8080/dist/bundle.js访问到服务器中的bundle.js文件
        // publicPath: '/dist',

        // 输出文件名字
        filename: 'bundle.js'
    },

    module: {
        rules: [
            // 配置的是用来解析.css文件的loader(style-loader和css-loader)
            {
                // 1.0 用正则匹配当前访问的文件的后缀名是  .css
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] //webpack底层调用这些包的顺序是从右到左
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'less-loader'
                }]
            },
            {
                test: /\.scss$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader'
                }, {
                    loader: 'sass-loader'
                }]
            },

            //解析图片字体用的,以后可能需要修改该配置,以支持更多的文件类型
            {
                test: /\.(png|jpg|gif|svg)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        //图片大于50000K的时候就是显示路径url 
                        //图片小于50000K的时候就是转换成base64位
                        limit: 50000
                    }
                }]
            },

            //配置解析vue.webpack
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },

            //解析es6等新语法
            {
                test: /\.js$/,

                // 我们在main.js入口中导入的第三方,不需要解析,所以这里排除,好处是提高打包效率
                //作用是排除第三方包的解析 
                include: /node_modules/, //也可以使用exclude  
                loader: 'babel-loader'
            }
        ]
    },

    //用于解析html
    plugins: [
        new HtmlWebpackPlugin({
            template: 'template.html',
            filename: 'index.html',
            title: "个人微商"

        })
    ]

}
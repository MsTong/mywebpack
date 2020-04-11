// webpack是node写出来的 node写法
let path = require('path');
let htmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    devServer:{
        port:3000,
        progress:true,
        contentBase:'./build',
        compress:true
    },
    mode:'development',
    entry:'./src/index.js', //入口
    output:{
        filename:'bundel.[hash].js',//打包后的文件名
        path:path.resolve(__dirname,'build') //绝对路径
    },
    plugins:[
        new htmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            // minify:{
            //     removeAttributeQuotes:true,
            //     collapseWhitespace:true
            // },
            hash:true
        })
    ],
    module:{
        rules:[{
            test:/\.css$/,
            use:[
                {
                    loader:'style-loader'
                }
                ,
                'css-loader'
            ]
        },{
            test:/\.less$/,
            use:[
                {
                    loader:'style-loader'
                },
                'css-loader',
                'less-loader'
            ]
        }]
    }
}
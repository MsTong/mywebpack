### webpack学习步骤
#### 1、webpack基础配置
##### webpack安装
1、npm init

2、npm i webpack webpack-cli -D

3、创建src文件加，index.js

##### webpack可以进行0配置
- 打包工具 -> 输出后的结果（js模块）
- 打包（支持我们的js模块）
<!-- index.js
require('./a.js')
console.log(99999)
 -->
4、npx webpack 命令打包 (默认道别，warning)
<!-- WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/configuration/mode/ -->

##### 手动配置webpack 
5、webpack.config.js(默认名字--webpack.config.js or webpackfile.js)
##### webpack打包出的文件解析

6、package.json script命令 修改打包读取的文件为 webpack.config.my.js
npm run build
```
"scripts": {
    "build": "webpack --config webpack.config.my.js"
},
```
或者知道命令参数方式(--)
npm run build -- --config webpack.config.my.js"
```
"scripts": {
    "build": "webpack"
},
```

<!-- webpack是node写出来的 node写法
let path = require('path');
module.exports = {
    mode:'development',
    entry:'./src/index.js', //入口
    output:{
        filename:'bundel.js',//打包后的文件名
        path:path.resolve(__dirname,'build') //绝对路径
    }
} -->

#### html插件
##### 启动本地前端开发服务
1、npm i webpack-dev-server -D
2、配置package.json 的script
npm run dev
```
"scripts": {
    "dev": "webpack-dev-server"
    }
```
3、webpack.config.js 配置服务启动信息
```
devServer:{
    port:3000,
    progress:true,
    contentBase:'./build',
    compress:true
}
```
##### 将src的index.html文件打包进build的index.html,并且引用build 的bundel.js
1、插件安装： npm install html-webpack-plugin --save-dev
2、webpack.config.js 配置 minify压缩打包后的html,hash值
3、filename:'bundel.[hash].js',//打包后的文件名
4、plugins数组放着所有插件
```
 let htmlWebpackPlugin = require('html-webpack-plugin');
 plugins:[
    new htmlWebpackPlugin({
        template:'./src/index.html',
        filename:'index.html'
         minify:{
            removeAttributeQuotes:true,
            collapseWhitespace:true
        },
        hash:true
    })
]
```

#### 样式处理
module 模块
1、npm i css-loader -D 处理require('./index.css') @important 
2、npm i style-loader -D  
```
module:{
        rules:[{
            test:/\.css$/,
            use:[
                {
                    loader:'style-loader',
                    options:{
                        insert:'top'
                    }
                }
                ,'css-loader']
        }]
    }
```
3、处理less, less less-loader
sass: node-sass sass-loader 
stylus stylus-loader 

#### 样式处理（2）
##### 将css打包到具体的文件并引入index.html
1、npm i mini-css-extract-plugin -D  
//插件
作用：将css打包到具体的文件并引入index.html
2、npm i postcss-loader autoprefixer -D
作用：第一个就是前面提到的把 CSS 解析成 JavaScript 可以操作的 AST，第二个就是调用插件来处理 AST 并得到结果。
比如可以支持变量和混入（mixin），增加浏览器相关的声明前缀，或是把使用将来的 CSS 规范的样式规则转译（transpile）成当前的 CSS 规范支持的格式
3、配置webpack.config.js 
```
new MiniCssExtractPlugin({
    filename:'main.css'
})
MiniCssExtractPlugin.loader,
postcss-loader;//放着css-loader之后
```
4、配置postcss.config.js
```
module.exports = {
    plugins:[require('autoprefixer')]
}
```

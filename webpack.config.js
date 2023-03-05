const path = require('path');

module.exports = {
    entry: './main.js', // 配置想要打包的 JS 文件
    output: {
        filename: 'main.js', // 打包后的文件名
        path: path.resolve(__dirname, "build"), // 打包后文件存放的目录
    },
    // experiments: { topLevelAwait: true },
    // module: {
    //     rules: [
    //         {
    //             test: /\.js$/, // 匹配js文件
    //             exclude: /node_modules/, // 排除node_modules目录
    //             use: {
    //                 loader: "babel-loader", // 使用babel-loader
    //             },
    //         },
    //     ],
    // },
    // resolve: {
    //     alias: {
    //         // 假设 siyuan 包位于 src/siyuan 目录下
    //         siyuan: path.resolve(__dirname, './')
    //     }
    // }
}

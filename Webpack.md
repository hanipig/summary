<!--
 * @Description: 
 * @Autor: hanipig
 * @Date: 2021-03-21 20:45:40
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-21 23:08:37
-->
## Webpack 梳理

+ 多入口打包
+ 抽离css文件：mini-css-extract-plugin
+ 抽离公共代码、第三方代码：添加optimization.splitChunks（initial：入口chunk，对异步导入的文件不处理；async：异步chunk，只对异步导入的文件处理；all：全部chunk）、optimization.cacheGroups.vendor（第三方模块）、optimization。cacheGroups.common（公共模块）
+ 异步加载、处理jxs、vue（vue-loader）
+ module、chunk、bundle的区别
  > module：各个源码文件，webpack中一切皆模块
  >
  > chunk：多个模块合成的，如entry、import()、splitChunk
  >
  > bundle：最终的输出文件

### 性能优化

- 开发环境
  - 优化打包构建速度
    - HMR(hot module replacement):热模块替换/模块热替换
      > 作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块），极大提升构建速度
      >
      > 样式文件：可以使用 HMR 功能：因为 style-loader 内部实现了
      >
      > js 文件：默认不能使用 HMR 功能
      >
      > html 文件：默认不能使用 HMR 功能，同时会导致 html 文件不能热更新了(解决：修改 entry 成数组形式，并把 index.html 文件也加入)
      >
      > html 文件不用 HMR,js 文件需要（只能处理非入口文件）
  - 优化代码调试
    - source-map：一种提供源代码到构建后代码映射技术
- 生产环境
  - 优化打包构建速度
    - oneOf：只会匹配一个 loader ，不能有两个配置处理同一种类型文件
    - 缓存：babel 缓存（直接配置 cacheDirectory: true,让第二次打包构建速度更快）、文件资源缓存
      > hash：每次构建时会生成一个唯一的 hash 值，缺点:js css 使用同一个 hash 值，如果重新打包，可能会导致 js css 缓存失效
      >
      > chunkhash：根据 chunk 生成的 hash,如果打包来源于同一个 chunk，那么 hash 值就一样、缺点：js 和 css 的 hash 值还是一样，因为 css 是在 js 中被引入的，所以同属于一个 chunk
      >
      > contenthash：根据文件的内容生成 hash,根据文件的内容生成的 hash,不同文件 hash 值一定不一样（让代码上线运行缓存更好使用）
    - 多进程打包 thread-loader
    - externals 拒绝指定包被打包进来（比如采用cdn引用进来）
    - dll 动态连接库：使用dll技术对某些库进行单独打包
    
  - 优化代码运行性能
      - tree shaking（去除无用代码，减少代码体积）
        > 前提条件（1.使用 es6 模块化 2.开启 production 模式 ）
        >
        > 可搭配 sideEffect 配置防止 css less...等资源被误当做无用代码被过滤
      - 代码分割（code split）
        + 多入口实现：有一个入口，最终输出就有一个bundle
        + optimization.splitChunks.chunks：'all' 
          > 1.可以将node_modules中的代码单独打包成一个chunk最终输出
          >
          >2.自动分析多入口chunk中，有没有公共的文件，如果有会打包成单独的一个chunk
        + 通过js代码，让某个文件被单独打包成一个chunk（import 动态导入语法：能将某个文件单独打包）
          > import(/\*webpackChunkName: '指定打包后的chunkname'\*/'./文件').then((result) => {

          }).then((err) => {})
      - 懒加载 lazy loading（当文件需要使用时才加载）、预加载（预加载会在使用之前，提前加载js文件）
        > 正常加载可以理解为并行加载（同一时间加载多个文件），预加载：等其他资源加载完毕，浏览器空闲了，再偷偷加载资源（低版本浏览器有兼容性问题，慎用）
        > import(/\*webpackChunkName: '指定打包后的chunkname', webpackPrefetch: true \*/'./文件').then((result) => {

          }).then((err) => {})
      - PWA 渐进式网络开发应用程序（离线可访问）：workbox --> workbox-webpack-plugin

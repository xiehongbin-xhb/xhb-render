# 使用说明

> 本项目使用 typescript 开发，项目使用 gulp 打包js文件，所有源码在 `src` 中，打包完成后可以直接拿 `dist` 目录下资源部署静态 web 项目。
1. 准备工作
   + 需要先安装 nodejs [https://nodejs.org](https://nodejs.org)
   + 在项目目录下，命令行运行`npm install`，安装依赖包
2. 如何打包？
   + 开发：运行 `npm run pack` 打包未混淆的js，这个时候修改 src 中的代码就会自动重新打包，无需每次修改都重新运行
   + 部署：运行 `npm run min` 打包混淆的js
3. 如何在编辑器中编辑资源？
   + 在编辑器服务端配置文件 `server/config.ini`, 配置一个新实例指向 `dist/storage`，分别修改名称（中括号中的）、端口（port）、资源路径(storageDir)，前两者不可与其它实例重复，资源路径使用项目 `dist/storage` 绝对路径即可
4. 开发预览
   + 可以使用`http`服务器访问，如装了`nodejs`后可以使用`http-server`访问
  
# 配置说明
> 在 dist/htconfig.js 文件中进行项目配置，主要配置项在`Project`属性下，主要配置属性如下
* baseURL：接口请求基础路径
  

# 更新日志

1. 2022-03-02
+ 补充 `ht.d.ts` 声明文件；(types\ht.d.ts)
+ 新增惯性交互，默认模板初始化时默认开启 `changeInteractor`； (src\ui\Main.ts)

2. 2022-03-24
+ 修复 `mock.ts` 配置异常问题；(src\util\mock.ts)
+ 修复 `latLonToLogical` 经纬度转化异常问题；(src\util\util.ts)

3. 2022-04-12
+ 补充 `ht-ui` 声明；（types\ht-ui.d.ts）

4. 2022-06-23
+ 修改 `ht.animationplayer` 的默认引用路径；（dist\index.html）
+ 动画编辑器插件实例化逻辑条件修改，当引用了 `ht.animationplayer` 时才会实例化；（src\ui\View.ts）
+ 新增 `post` 建议示例；（src\util\mock.ts）
+ 修复场景缓存后再次执行 `deserialize`，`批量` 未刷新问题；（src\util\util.ts）

5. 2022-07-11
+ 新增打包时增加版本编译时间功能；（src\index.ts）

6. 2022-11-07
+ 移除【动画编辑器】注释； (types\ht.d.ts)

7. 2022-11-15
+ 优化预加载逻辑，确保能在100%的时候停留100毫秒

8. 2022-11-22
+ 补充 `ht-ui` 声明，主要是eui部分；（types\ht-ui.d.ts）
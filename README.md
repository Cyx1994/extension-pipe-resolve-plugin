#### **需要Webpack V4.X 支持**

### 这是什么

通常情况下，前端项目中如果需要根据不同状态执行不同的代码，需要通过一个全局变量，或另起分支的方式实现逻辑隔离。

在ReactNative工程中，Native Script支持通过扩展名来实现[特定平台代码](https://reactnative.cn/docs/platform-specific-code/)。

````javascript
// 命名
BigButton.ios.js
BigButton.android.js
// 引用
import BigButton from './BigButton';
````

这个插件便是通过Webpack Resolve Plugin模拟实现相同功能。

### 使用方法

在Webpack‘s Config 加入以下配置

````javascript
const ExtensionPipeResolvePlugin = require('extension-pipe-resolve-plugin');

resolve: {
  plugins: [
    new ExtensionPipeResolvePlugin('pdd')
  ]
}
````

接着，当你引用 `import Demo from "component/demo" ` 并且 `component` 目录下包含 `demo.pdd.js` ，则会优先引用`demo.pdd.js`。

当然，你也可以自行配置该插件适用于哪些类型的文件，将文件类型的数组传入插件的第二个参数即可。

````javascript
const ExtensionPipeResolvePlugin = require('extension-pipe-resolve-plugin');

resolve: {
  plugins: [
    new ExtensionPipeResolvePlugin('pdd', ['js','html','css'])
  ]
}
````



##### UMI集成

````javascript
chainWebpack(config) {
    config.resolve.plugin('extension-pipe-resolve-plugin').use(ExtensionPipeResolvePlugin, [extension, includes]);
}
````

由于dva存在使用文件名给model的namespace赋值的情况，请尽量避免给model文件加拓展名。
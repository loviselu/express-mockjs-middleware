# express-mockjs-middleware

An Express mockjs middleware

## Install
```
npm install express-mockjs-middleware
```

## Usage 
```js
var expressMock = require('express-mockjs-middleware');
app.use('/mock',expressMock(path.resolve(__dirname,'../mock')));

```

## Example
```js
//file in /mock/test.js  => /mock/test?page=1
module.exports = {
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': '@page' //占位符,会自动将参数page的值填在这里
    }]
}

```

## Feature
- Mockjs Syntax (https://github.com/nuysoft/Mock/wiki/Syntax-Specification)
- support .js .json
- Auto extend Mock.Random by url params
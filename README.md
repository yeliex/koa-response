# koa-response

Response Middleware for koajs

[![npm](https://img.shields.io/npm/v/koa-response.svg?style=flat-square)](https://www.npmjs.com/package/koa-response)

## Installation
```
$ npm install koa-response
```

## koa@2
```
$npm install koa-response@next
```

## Usage
```js
const app = require('koa')();
const response = require('koa-response');

app.use(response((responsed) => {console.log(responsed.method,request.body)}));

app.use(function *(next){
  this.throw(200,success);
});
```

## API
```js
this.throw(status,data/error,isjson);

  - status: 状态码,400以下为成功
  - data/error: 返回的数据/错误
      - 当返回失败(status>=400 || status === false),且没有指定error时,默认返回默认错误
  - isjson: 是否已json格式返回,默认true
      - false时返回类似nginx错误的html

```

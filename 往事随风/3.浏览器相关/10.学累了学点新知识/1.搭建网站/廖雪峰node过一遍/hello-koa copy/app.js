

// 导入controller middleware:
const controller = require('./controller');
const Koa = require('koa')
const app = new Koa()

app.use(controller());
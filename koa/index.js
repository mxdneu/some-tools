// koa api

const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = {
    1: 'suck',
  }
});


router.get('/get/:id', (ctx, next) => {
  let { id }= ctx.params;
  ctx.body = {
    id,
    code: 1,
    success: id !== 5,
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

console.log('run----');
app.listen(3000);
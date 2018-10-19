const fs = require("fs");
// const Koa = require("koa");
const path = require("path");
// const koaStatic = require('koa-static')
// const app = new Koa();
const express = require('express');

const server = express();

const resolve = file => path.resolve(__dirname, file);
// 开放dist目录
// app.use(koaStatic(resolve('./dist')))

// 第 2 步：获得一个createBundleRenderer
const { createBundleRenderer } = require("vue-server-renderer");
const bundle = require("./dist/vue-ssr-server-bundle.json");
const clientManifest = require("./dist/vue-ssr-client-manifest.json");

const renderer = createBundleRenderer(bundle, {
  runInNewContext: false,
  template: fs.readFileSync(resolve("./src/index.temp.html"), "utf-8"),
  clientManifest: clientManifest
});


server.get('/', (req, res) => {
  const context = { 
    title: "ssr test",
    url: req.url 
  }
  // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
  // 现在我们的服务器与应用程序已经解耦！
  renderer.renderToString(context, (err, html) => {
    console.log(err, html)
    // 处理异常……
    res.end(html)
  })
})

const port = 3000;
server.listen(port, function() {
  console.log(`server started at localhost:${port}`);
});


// function renderToString(context) {
//   return new Promise((resolve, reject) => {
//     renderer.renderToString(context, (err, html) => {
//       err ? reject(err) : resolve(html);
//     });
//   });
// }
// // 第 3 步：添加一个中间件来处理所有请求
// app.use(async (ctx, next) => {
//   const context = {
//     title: "ssr test",
//     url: ctx.url
//   };
//   // 将 context 数据渲染为 HTML
//   const html = await renderToString(context);
//   ctx.body = html;
// });

// const port = 3000;
// app.listen(port, function() {
//   console.log(`server started at localhost:${port}`);
// });
// const serve = (path, cache) => express.static(resolve(path), { maxAge: cache ? 0 : 0 });

server.use(express.static(path.join(__dirname, 'dist')));
// server.use('/js', serve('./dist/js', true));
// server.use('/css', serve('./dist/css', true));

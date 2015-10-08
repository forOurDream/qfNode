import httpProxy from 'http-proxy';
import RedisSessions from 'redis-sessions';
import Cookies from 'cookies';
import http from 'http';
let rs = new RedisSessions();
const rsapp = 'qf';


let proxy = httpProxy.createProxyServer({
  target: 'http://localhost:7070'
});


/*
proxy.on('proxyReq', async function(proxyReq, req, res, options) {
  let cookies = new Cookies(req, res);
  await new Promise((resolve, reject) => {
    setTimeout(()=> {
      console.log('set cookie, should fail');
      cookies.set('test', 'like a boss');
      reslove();
    }, 2000);
  });
  console.log('not waiting???');
});
*/

http.createServer(async (req, res) => {

  //let cookies = new Cookies(req, res);
  /*
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('set cookie, should fail');
      cookies.set('test', 'like a boss');
      resolve();
    }, 100);
  });

  console.log('not waiting???');
*/


  req.url = req.url.replace('/api','');
  let {token,form} = req.headers;
  req.url+=`?FID=${form}&PCID=${token}`;
  console.log(req.url);
  proxy.on('proxyRes', function (proxyRes, req, res) {
  });

  proxy.web(req, res, { target: 'http://115.29.136.30/index.php', changeOrigin: true });

}).listen(8080, () => {
  console.log('listening on 8080');
});


//production: 114.215.135.146
//development: 115.29.136.3
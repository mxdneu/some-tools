// 封装ajax，使用promise

// ready state
// 0: 请求初始化
// 1: 服务器建立连接
// 2: 请求已经接受
// 3: 请求处理中
// 4: 请求以完成，响应就绪

const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

module.exports = function pAjax(url, id) {
  const promise = new Promise((resolve, reject) => {
    const uri = 'http://127.0.0.1:3000/'
    const handle = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.responseText);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open('GET', `${uri}${url}/${id}`);
    client.onreadystatechange = handle;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  });
  return promise;
}

function ustAjax(url) {
  return new Promise((resolve, reject) => {
    const handle = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.responesText);
      } else {
        reject(this.statusText);
      }
    }
    const client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handle;
    client.responseType = "json";
    client.setRequestHeader('Accept', 'application/json');
    client.send();
  })
}
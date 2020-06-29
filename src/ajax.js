// 封装ajax，使用promise

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
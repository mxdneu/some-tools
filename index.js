const pAjax = require('./src/ajax');

async function get(url, id) {
  const res = await pAjax(url, id);
  console.log(res);
  return res;
}


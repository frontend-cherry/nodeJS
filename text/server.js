const express = require('express'),
				fs = require("fs"),
				colors = require('colors');


//-------------    写接口，暴露数据     --------------
// 读取已有的数据
const data = fs.readFileSync('./data.json').toString();
//接口暴露
const app = express();
app.get('/api/data', function (req, res) {
   res.send(data);
});
const server = app.listen(9999, function () {
  console.log("接口地址为：","http://localhost:9999/api/data".green);
});
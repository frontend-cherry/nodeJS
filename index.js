const cheerio = require('cheerio');
const http = require('http');
const iconv = require('iconv-lite');
const fs = require("fs");
const colors = require('colors');

// 爬取和存入
http.get('http://www.shuoshuodaitupian.com/', function (sres) {
  var chunks = []; // 用来装得到的HTML
  sres.on('data', function (chunk) {
    chunks.push(chunk);
    console.log('<<<------------------------------- 得到html ------------------------------->>>\n'.green);
    console.log("html:\n", chunks.toString(),"\n"); // 输出得到的html看看
  });
  sres.on('end', function () {
    var titles = []; // 用来装摘取的目标元素
    var html = iconv.decode(Buffer.concat(chunks), 'utf-8');
    var $ = cheerio.load(html, {
      decodeEntities: false
    });
    $('#snsBox .item').each(function (index, element) {
      var $element = $(element);
      titles.push({
        text: $element.text()
      });
    });
    console.log('<<<------------------------------- 摘取目标元素完毕 ------------------------------->>>\n'.green);

    /*-------------    存下来     --------------*/
    console.log("目标元素:\n", titles,"\n");
    var writerStream = fs.createWriteStream('data.json');
    writerStream.write(JSON.stringify(titles), 'UTF8');
    writerStream.end();
    // 处理流事件 --> data, end, and error
    writerStream.on('finish', function () {
      console.log('<<<------------------------------- 写入完成 ------------------------------->>>\n'.green);
    });
    writerStream.on('error', function (err) {
      console.log(err.stack);
    });
  });
});



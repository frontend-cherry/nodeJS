const https = require("https"),
    fs = require("fs"),
    request = require('request'),
    cheerio = require("cheerio"),
    colors = require('colors');



https.get('https://www.ivsky.com/bizhi/chahua_t1725/', function (res) {
    var data;
    res.on("data", function (chunk) {
        data += chunk;
        console.log(data);
    });
    res.on("end", function () {
        console.log("<<<----------------------- html响应完毕 ----------------------->>>".green);
        var $ = cheerio.load(data, {
            decodeEntities: false
        });
        var picUrl = [];
        for (let i = 0; i < $('img').length; i++) {
            picUrl.push("https:" + $('img')[i].attribs.src);
        };
        console.log(picUrl);
        console.log("<<<----------------------- 目标数据获取完毕 ----------------------->>>".green);
        //创建images目录，用于装图片
        fs.mkdir("images", function (err) {
            if (err) {
                return console.error(err);
            }
            console.log("目录创建成功.开始装入图片...".green);
            picUrl.forEach((url, idx) => {
                let PicName = url.split('/').pop(); // 已原网络图片的名称命名本地图片
                request({
                    url
                }).pipe(
                    fs.createWriteStream(`./images/${PicName}`).on('error', err => {
                        console.log("写入错误：".red, err.stack);
                    })
                );
            });
            console.log("<<<----------------------- 写入完毕 ----------------------->>>".green);
        });
    });
}).on("error", function (err) {
    console.log(err);
});

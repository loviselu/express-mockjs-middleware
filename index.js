var Mock = require('mockjs');
var url = require('url');
var fs = require('fs');
var path = require('path');

module.exports = function(mockDir){

    return function(req, res, next) {

        var parsed = url.parse(req.url);
        var pathname = parsed.pathname.substr(1);
        var fileExists = false;
        var filePath = path.resolve(mockDir,pathname);
        
        //先看看文件是否存在
        if(fs.existsSync(filePath)){
            fileExists = true
        //试一下补.js后缀
        }else if(fs.existsSync(filePath+'.js')){
            filePath += '.js'
            fileExists = true
        //试一下补.json后缀
        }else if(fs.existsSync(filePath+'.json')){
            filePath += '.json'
            fileExists = true
        }

        if(fileExists){
            require.cache[filePath] && (delete require.cache[filePath])
            obj = require(filePath);

            res.writeHead(200, {'Content-Type': 'application/json;charset=UTF-8'});

            //把所有参数都放到Mock.Random中用于占位符
            var extendObj = {};
            var query;

            if(req.method === "GET"){
                var url_parts = url.parse(req.url, true);
                query = url_parts.query;
            }else if (req.method == 'POST') {
                query = req.body;
            }

            for(var key in query){
                extendObj[key.toLowerCase()] = (function(key){
                    return function(){
                        return query[key]
                    };
                })(key)
            }

            Mock.Random.extend(extendObj)
            res.end(JSON.stringify(Mock.mock(obj)));
        }else{
            res.writeHead(404);
            res.end();
        }
    }
}

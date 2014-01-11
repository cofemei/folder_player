var connect = require('connect')
  , http = require('http');
var fs = require('fs');
var url = require('url');
var port = "8000"

var server = connect()
  .use(connect.logger('dev'))
  .use(connect.static(__dirname + '/public'))
  .use(connect.static(__dirname))
  .use('/vol', function(req, res){
		var forder_list = fs.readdirSync("./");
		var result = [];
		for (var f in forder_list) {
			var forder = forder_list[f];
			if(fs.statSync(forder).isDirectory() && !forder.match(/folder_player|node|\.|public/g) ) {
				result.push(forder);
			}
		}
		res.end(JSON.stringify(result));
  })


  .use('/list', function(req, res){
		var url_parts = url.parse(req.url, true);
		var query = url_parts.query;
		var forder_list = fs.readdirSync("./"+query['query']+"/");

		var result = [];
		for (var f in forder_list) {
			var forder = forder_list[f];
			result.push("/"+query['query']+"/"+forder);
		}
		res.end(JSON.stringify(result));
  })
  // .use('/', function(req, res){
  // 	res.end("hellow\n");
  // })

console.log("Server running. Browse to http://localhost:"+port);
http.createServer(server).listen(port);

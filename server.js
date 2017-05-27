//
// # SimpleServer
//
var http = require('http');
var path = require('path');

var express = require('express');
var src_deps = require('./scripts/get_src_deps')();
var vendor_deps = require('./vendor-deps');

//
// ## SimpleServer `SimpleServer(obj)`
//
// Creates a new instance of SimpleServer with the following options:
//  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
//
var router = express();
var server = http.createServer(router);

router.set('view engine', 'pug');
router.use("/src", express.static(path.resolve(__dirname + '/client/')));
router.use("/vendor", express.static(path.resolve(__dirname + "/node_modules/")));
router.use(require('./util/error-handler'));


router.get('/*', function(req, res) {
  res.render('index', {
    vendor_deps: vendor_deps,
    src_deps: src_deps
  });
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Chat server listening at", addr.address + ":" + addr.port);
});
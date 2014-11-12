
var restify = require('restify');

var database = require('./databasequery.js');

// Server
var server = restify.createServer();

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(3000, function () {
    console.log("Server started @ 3000");
});

server.get('/hello/customers', database.getcustomers);
server.get('/hello/customer/:id', database.getcustomer);
server.post('/hello/addcustomer', database.postcustomers);
server.del('/hello/deletecustomer/:id', database.deletecustomer);
server.put('/hello/updatecustomer/:id', database.updatecustomer);
server.get(/.*/, restify.serveStatic({
 directory: './app/'
}));



var mongojs = require('mongojs');

var db = mongojs('test',['customers']);
function getcustomers(req, res, next) {
    
    db.customers.find(function (err, customers) {

        if(err){
            console.log("Error retrieving data from database");
        }
        else{
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(customers));
            console.log("retrieving successful");
        }
    });
    return next();
};

exports.getcustomers = getcustomers;

function getcustomer(req, res, next) {
    var parsedId = parseInt(req.params.id);
    db.customers.findOne({
        id: parsedId
    }, function (err, customer) {

        if(err){
            console.log("Error retrieving data from database");
        }
        else{
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(customer));

            if(customer){
                    console.log("retrieving single successful");
                }
                else{
                    console.log("Nothing retrieved");
                }
        }
    });
    return next();
};

exports.getcustomer = getcustomer;

function postcustomers(req, res, next) {
    
    var customer = req.params;
    
    db.customers.save(customer,
        function (err, data) {
            if(err){
                console.log("Error updating data to database");
            }
            else{
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(data));
                console.log("adding successful");
            }
        });
    return next();
};

exports.postcustomers= postcustomers;
function deletecustomer(req, res, next) {
   var parsedId = parseInt(req.params.id);
    //var id = req.params;
    db.customers.remove({id:parsedId},
        function (err, data) {
            if(err){
                console.log("Error deleting data from database");
            }
            else{
                res.writeHead(200, {
                    'Content-Type': 'application/json; charset=utf-8'
                });
                res.end(JSON.stringify(data));
                console.log(JSON.stringify(data));
                if(data.n){
                    console.log("deleting successful");
                }
                else{
                    console.log("no data to delete");
                }
            }
        });
    return next();
};
exports.deletecustomer= deletecustomer;


function updatecustomer (req, res, next) {
    console.log("SOMETHNG--"+JSON.stringify(req.params));
    var parsedId = parseInt(req.params.id);
    // get the existing customer
    db.customers.findOne({
        id: parsedId
    }, function (err, data) {
        
        var updatedCustomer = {};
        console.log("DATA-----"+JSON.stringify(data));

        for (var n in data) {
            
                updatedCustomer[n] = data[n];
                console.log("DATA-----"+data[n]);
        }
        for (var n in req.params) {
                updatedCustomer[n] = req.params[n];
                
        }
                console.log(req.params);
                console.log("UPDATED CUSTOMER---------"+updatedCustomer);

        
        db.customers.update({
            id: parsedId
        },{name:updatedCustomer.name,
            id:parseInt(updatedCustomer.id),
            city:updatedCustomer.city,
            state:updatedCustomer.state,
            zip:updatedCustomer.zip,
            number:updatedCustomer.number}, {
            multi: false
        }, function (err, data) {
            if(err){
                console.log('update failed');
            }
            else{
            res.writeHead(200, {
                'Content-Type': 'application/json; charset=utf-8'
            });
            res.end(JSON.stringify(data));
            if(data.n){
                    console.log("updating successful");
                }
                else{
                    console.log("Updation not successful");
                }
            
        }
        });
        
    });
    return next();
};

exports.updatecustomer = updatecustomer;
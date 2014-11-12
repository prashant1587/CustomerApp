

customerApp.factory('customerFactory',['$http', function($http) {

var urlBase = '/hello/';
var factory={};

factory.getCustomers = function(){

	return $http.get(urlBase+'customers').success(function(data){
		console.log('I m here');
	return data;
	})
	.error(function (msg){
	return msg;
	});
} 

factory.getCustomer = function(id){

	return $http.get(urlBase+'customer/'+id).success(function(data){
	return data;
	})
	.error(function (msg){
	return msg;
	});
} 

factory.postCustomer = function(customer){


	return $http.post(urlBase+'addcustomer', customer).success(function(response) {
		return response;

        }).
        error(function(response) {
		return response;
        });
}

factory.deleteCustomer = function(id){

	return $http.delete(urlBase+'deletecustomer/'+id).success(function(response) {
		return response;

        }).
        error(function(response) {
		return response;
        });
}

factory.updateCustomer = function(customer){

	return $http.put(urlBase+'updatecustomer/'+customer.id,customer).success(function(response) {
		return response;

        }).
        error(function(response) {
        	console.log("Response not there");
		return response;
        });
}

 factory.convertToInt= function (value) {
            return parseInt(value);
        }; 

return factory;
 
}]);
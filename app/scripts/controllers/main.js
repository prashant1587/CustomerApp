'use strict';

/**
 * @ngdoc function
 * @description
 * # MainCtrl
 * Controller of the customerApp
 */

 
customerApp.controller('CustomerController', function ($scope, customerFactory) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
	
		   customerFactory.getCustomers()
			  .then(function (response){
				$scope.customers = response.data;
			});
	};
});

customerApp.controller('AddCustomerController', function ($scope, customerFactory){
	


    
    $scope.convertToInt= customerFactory.convertToInt;

	 $scope.insertCustomer = function (customer) {

            if($scope.customerForm.$valid){
    	 	
            customerFactory.postCustomer(customer).then(function (response){

            	console.log(response.data);

                 $scope.customer = {'name':'','id':'','city':'','state':'','zip':'','number':''};
    		});
        };
    };
});

customerApp.controller('DeleteCustomerController', function ($scope, customerFactory){
	
    $scope.searchCustomer = function (id) {

        $scope.submitted = true;
        customerFactory.getCustomer(id).then(function (response){
            console.log(response.data);
            console.log("retirve to delete");
            if(response.data!="null" && response.data != undefined){
            $scope.customer = response.data;
            $scope.delcustomer = $scope.customer;
             }
        });
    }	
	 $scope.deleteCustomer = function (id) {
        customerFactory.deleteCustomer(id).then(function (response){
        	console.log(id);
        	console.log(response.data);
            $scope.delcustomer = {'name':'','id':''};
            $scope.customer = {'name':'','id':''};
        });
    };
});

customerApp.controller('UpdateCustomerController', function ($scope, customerFactory){
	$scope.searchCustomer = function (id) {

        $scope.submitted = true;
        customerFactory.getCustomer(id).then(function (response){
            console.log("retirve to update");
            if(response.data!="null" && response.data != undefined){
            $scope.customer = response.data;
            console.log("intial--"+JSON.stringify(response.data));
            $scope.upCustomer = $scope.customer;
        };
        });
    }; 

    $scope.convertToInt= customerFactory.convertToInt;

	$scope.updateCustomer = function (upCustomer) {
        $scope.updateSubmitted = true;
        if($scope.customerUpdateForm.$valid){
        
            customerFactory.updateCustomer(upCustomer).then(function (response){
            	console.log(upCustomer);
            	console.log(response.data);
                $scope.upCustomer = {'name':'','id':'','city':'','state':'','zip':'','number':''};
                $scope.customer = {'name':'','id':'','city':'','state':'','zip':'','number':''};
         
            });
        }
    };

});

    
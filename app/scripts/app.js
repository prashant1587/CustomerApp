'use strict';

/**
 * @ngdoc overview
 * @name customerApp
 * @description
 * # customerApp
 *
 * Main module of the application.
 */

 var customerApp = angular.module('customerApp',['ngRoute']);

customerApp.config(function ($routeProvider) {
    $routeProvider
      .when('/viewcustomer', {
        templateUrl: '../views/partials/ViewCustomer.html',
        controller: 'CustomerController'
      })
      .when('/addcustomer', {
        templateUrl: '../views/partials/AddCustomer.html',
        controller: 'AddCustomerController'
      })
      .when('/delcustomer', {
        templateUrl: '../views/partials/DeleteCustomer.html',
        controller: 'DeleteCustomerController'
      })
      .when('/updatecustomer', {
        templateUrl: '../views/partials/UpdateCustomer.html',
        controller: 'UpdateCustomerController'
      })
      .otherwise({
        redirectTo: '/viewcustomer'
      });
  });

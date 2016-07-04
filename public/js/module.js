'use strict';

var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('residents', {
        url: '/residents', 
        templateUrl: 'html/residents.html',
        controller: 'residentListCtrl'
      })
    .state('showResident', {
      url: '/residents/:residentId', 
      templateUrl: 'html/showResident.html', 
      controller: 'showResdientCtrl'
      })
    .state('apartments', {
        url: '/apartments', 
        templateUrl: 'html/apartments.html',
        controller: 'apartmentListCtrl'
      })
    .state('showApartment', {
      url: '/apartments/:apartmentId', 
      templateUrl: 'html/showApartment.html', 
      controller: 'showApartmentCtrl'
      })
    .state('manage', {
      url: '/manage', 
      templateUrl: 'html/manage.html', 
      controller: 'manageCtrl'
      })
});

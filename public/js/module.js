'use strict';

var app = angular.module('myApp', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('albums', {
        url: '/albums', 
        templateUrl: 'html/albums.html',
        controller: 'albumsCtrl'
      })
    .state('showAlbum', {
      url: '/album/:albumId', 
      templateUrl: 'html/showAlbum.html', 
      controller: 'showAlbumCtrl'
      })
    .state('showPicture', {
      url: '/album/:albumId/:pictureId', 
      templateUrl: 'html/showPicture.html', 
      controller: 'showPictureCtrl'
      })
});

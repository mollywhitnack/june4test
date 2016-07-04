'use strict';

var app = angular.module('myApp');

app.service('Picture', function($http, $q){

  this.getAll = () =>{
    return $http.get('/api/pictures');
  }

  this.getById = id =>{
    return $http.get(`/api/pictures/${id}`);
  }


  this.addPicture = (picture) =>{
    console.log("add pic in servies: ", picture);
    return $http.post(`/api/pictures`, picture)
      .then(res => {
        return $q.resolve(res.data);
      })
      .catch(err => {   
        console.log('err:', err);
      })
    };

  this.deletePicture = (id) =>{
    return $http.delete(`/api/pictures/${id}`)
      .then( () => {
        return $q.resolve();
      })
      .catch(err => {   
        console.log('err in serv:', err);
      })
    };


});

app.service('Album', function($http, $q){

  this.getAll = () =>{
    return $http.get('/api/albums');
  }

  this.getById = id =>{
    return $http.get(`/api/albums/${id}`);
  }

  this.addAlbum = (album) =>{
    return $http.post(`/api/albums`, album)
      .then(res => {
        return $q.resolve(res.data);
      })
      .catch(err => {   
        console.log('err:', err);
      })
    };

  this.deleteAlbum = (id) =>{
    return $http.delete(`/api/albums/${id}`)
      .then( () => {
        return $q.resolve();
      })
      .catch(err => {   
        console.log('err:', err);
      })
    };

  this.updateAlbum = (id, album) =>{
      return $http.put(`/api/albums/${id}`, album)
      .then(res => {
        return $q.resolve(album);
      })
      .catch(err => {   
        console.log('err:', err);
      })
    };

  this.addPictureToAlbum = (albumId, picId) =>{
      return $http.put(`/api/albums/${albumId}/addPicture/${picId}`)
      .then(res => {
        return $q.resolve(res.data);
      })
      .catch(err => {   
        console.log('err:', err);
      })
    };

  this.removePictureFromAlbum = (albumId, picId) =>{
       console.log("remove from album");
      return $http.put(`/api/albums/${albumId}/removePicture/${picId}`)
      .then(res => {
        return $q.resolve();
      })
      .catch(err => {   
        console.log('err:', err);
      })
    };
});

//in residents Resident.getAll()
//                .then(residents =>{})
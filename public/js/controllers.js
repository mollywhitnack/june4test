'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, Picture, Album) {

 Picture.getAll()
    .then(res =>{
      $scope.pictures = res.data;
    })
    .catch(err =>{
      console.log("err: ", err);
    })

    Album.getAll()
    .then(res =>{
      $scope.albums = res.data;
      console.log("$scope.apartments:", $scope.albums);
    })
    .catch(err =>{
      console.log("err: ", err);
    })

});

app.controller('albumsCtrl', function($scope, Album) {
  Album.getAll()
    .then(res =>{
      $scope.albums = res.data;
      console.log("$scope.albums:", $scope.albums);
    })
    .catch(err =>{
      console.log("err: ", err);
    })

    $scope.addAlbum = () =>{
      Album.addAlbum($scope.newItem)
      .then(album =>{
        $scope.albums.push(album);
        $scope.newItem = {};
      })
      .catch(err=>{
        console.log("error: ", err );
      });
    }


  $scope.deleteAlbum = (ind, album) =>{
    console.log("album:", album)
    Album.deleteAlbum(album._id)
    .then(album => {
      //console.log("item to add", item);
      $scope.albums.splice(ind,1);
    })
    .catch(err=>{
      console.log("error: ", err );
    });
  }

  $scope.showUpdateForm = (index, album) =>{
    console.log("index: ", index);
    console.log("album: ", album);
    $scope.showUpdate =true;
    $scope.updateItem = album;
    $scope.updateIndex = index;
  }

  $scope.updateAlbum = () =>{
    $scope.showUpdate =false;
    Album.updateAlbum($scope.updateItem._id, $scope.updateItem)
    .then(album =>{
      console.log("update apt:" , $scope.updateItem._id, " , " , $scope.updateItem);
    })
    .catch(err=>{
      console.log("error: ", err );
    });
  }

});


app.controller('showAlbumCtrl', function($scope, Album, Picture, $stateParams) {
  console.log('showAlbumCtrl!');
  console.log('$stateParams:', $stateParams);   //this will be apt id

  $scope.currentPictures = [];
  $scope.availableResidents = $scope.pictures;;
  //or w/e my func is called
  Album.getById($stateParams.albumId)
    .then(res =>{
      $scope.album = res.data;
      getCurrentPictures()
    })

  //adds picture to picture databse
  //need to add picture to album
  $scope.addPicture = ()=>{
    Picture.addPicture($scope.newItem)
    .then(picture=>{
      console.log("added" , picture);
      Album.addPictureToAlbum($stateParams.albumId, picture._id)
    })
    .catch(err=>{
      console.log("error: ", err );
    })
  }

  /*function addPictureToAlbum(albumId){
      Album.addPictureToAlbum(albumId, $scope.cuurPic._id){

      }
  }*/

    
    //577aa9c5fb3a05962ef543d4
    //577aa9cffb3a05962ef543d7
    //577aad2238bbf4c62e9284ca

  $scope.deletePicture = (ind, picId) =>{
    console.log("picture:", picId)
    Album.removePictureFromAlbum($scope.album._id, picId);
    Picture.deletePicture(picId)
    .then(picture => {
      $scope.pictures.splice(ind,1);
    })
    .catch(err=>{
      console.log("error: ", err );
    });
  }

  function getCurrentPictures(){
    console.log("$scope.pictures:", $scope.pictures);
    console.log("$scope.album.picture:", $scope.album.picture);
    for(var j = 0; j< $scope.pictures.length; j++){
      for(var i =0; i< $scope.album.picture.length; i++){
      console.log("compare:" , $scope.album.picture[i], " vs ", $scope.pictures[j]._id);
        if($scope.album.picture[i] === $scope.pictures[j]._id){
          console.log("match");
          $scope.currentPictures.push($scope.pictures[j])
        }
      }
      console.log("i:", i , "j:", j );
    }
    console.log("done")
    //console.log('$scope.CurrentResidents', $scope.currentResidents)
  }


  /*$scope.showUpdateForm = (index, resident) =>{
    console.log("index: ", index);
    console.log("resident: ", resident);
    $scope.showUpdate =true;
    $scope.updateItem = resident;
    $scope.updateIndex = index;
  }

  $scope.updateResident = () =>{
    console.log("update res :", $scope.updateItem);
    $scope.showUpdate =false;
    Resident.updateResident($scope.updateItem._id, $scope.updateItem)
    .then(resident =>{
      console.log("update apt:" , $scope.updateItem._id, " , " , $scope.updateItem);
    })
    .catch(err=>{
      console.log("error: ", err );
    });
  }*/

});

app.controller('showPictureCtrl', function($scope, Picture, $stateParams) {
  console.log('showPictureCtrl!');
  //or w/e my func is called
  Picture.getById($stateParams.pictureId)
    .then(res =>{
      $scope.picture = res.data;
    })
});





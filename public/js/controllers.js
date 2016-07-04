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


app.controller('showAlbumCtrl', function($scope, Album, Picture, $stateParams,  $state) {
  console.log('showAlbumCtrl!');
  console.log('$stateParams:', $stateParams);   //this will be apt id


  $scope.currentPictures = [];
  $scope.availableResidents = $scope.pictures;;
  Album.getById($stateParams.albumId)
    .then(res =>{
      $scope.album = res.data;
      getCurrentPictures()
    })

  $scope.addPicture = ()=>{
    Picture.addPicture($scope.newItem)
    .then(picture=>{
      console.log("added" , picture);
      Album.addPictureToAlbum($stateParams.albumId, picture._id);
    })
    .then($state.go($state.$current, null, { reload: true }))
    .catch(err=>{
      console.log("error: ", err );
    })
  }

  $scope.deletePicture = (ind, picId) =>{
    console.log("picture:", picId)
    Album.removePictureFromAlbum($scope.album._id, picId);
    Picture.deletePicture(picId)
    .then(picture => {
      $scope.pictures.splice(ind,1);
      $state.go($state.$current, null, { reload: true });

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


});

app.controller('showPictureCtrl', function($scope, Picture, $stateParams) {
  console.log('showPictureCtrl!');
  //or w/e my func is called
  Picture.getById($stateParams.pictureId)
    .then(res =>{
      $scope.picture = res.data;
    })
});





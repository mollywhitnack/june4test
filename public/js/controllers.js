'use strict';

var app = angular.module('myApp');

app.controller('mainCtrl', function($scope, Resident, Apartment) {
 Resident.getAll()
    .then(res =>{
      $scope.residents = res.data;
      console.log("$scope.residents:", $scope.residents);
    })
    .catch(err =>{
      console.log("err: ", err);
    })

    Apartment.getAll()
    .then(res =>{
      $scope.apartments = res.data;
      console.log("$scope.apartments:", $scope.apartments);
    })
    .catch(err =>{
      console.log("err: ", err);
    })
});

app.controller('apartmentListCtrl', function($scope, Apartment) {
  Apartment.getAll()
    .then(res =>{
      $scope.apartments = res.data;
      console.log("$scope.apartments:", $scope.apartments);
    })
    .catch(err =>{
      console.log("err: ", err);
    })

    $scope.addApartment = () =>{
      Apartment.addApartment($scope.newItem)
      .then(apartment =>{
        $scope.apartments.push(apartment);
        $scope.newItem = {};
      })
      .catch(err=>{
        console.log("error: ", err );
      });
    }


  $scope.deleteApartment = (ind, apartment) =>{
    console.log("apartment:", apartment)
    Apartment.deleteApartment(apartment._id)
    .then(apartment => {
      //console.log("item to add", item);
      $scope.apartments.splice(ind,1);
    })
    .catch(err=>{
      console.log("error: ", err );
    });
  }

  $scope.showUpdateForm = (index, apartment) =>{
    console.log("index: ", index);
    console.log("apartment: ", apartment);
    $scope.showUpdate =true;
    $scope.updateItem = apartment;
    $scope.updateIndex = index;
  }

  $scope.updateApartment = () =>{
    $scope.showUpdate =false;
    Apartment.updateApartment($scope.updateItem._id, $scope.updateItem)
    .then(apartment =>{
      console.log("update apt:" , $scope.updateItem._id, " , " , $scope.updateItem);
    })
    .catch(err=>{
      console.log("error: ", err );
    });
  }

});


app.controller('showApartmentCtrl', function($scope, Apartment, $stateParams) {
  console.log('showApartmentCtrl!');
  console.log('$stateParams:', $stateParams);   //this will be apt id

  $scope.currentResidents = [];
  $scope.availableResidents = $scope.residents;;
  //or w/e my func is called
  Apartment.getById($stateParams.apartmentId)
    .then(res =>{
      $scope.apartment = res.data;
      getCurrentResidents()
    })

  function getCurrentResidents(){
    console.log("$scope.residents:", $scope.residents);
    console.log("$scope.apartment.residents:", $scope.apartment.residents);
    for(var j = 0; j< $scope.residents.length; j++){
      for(var i =0; i< $scope.apartment.residents.length; i++){
      console.log("compare:" , $scope.apartment.residents[i], " vs ", $scope.residents[j]._id);
        if($scope.apartment.residents[i] === $scope.residents[j]._id){
          $scope.currentResidents.push($scope.residents[j])
          $scope.availableResidents.splice(j, 1)
        }
      }
      console.log("i:", i , "j:", j );
    }
    console.log("done")
    //console.log('$scope.CurrentResidents', $scope.currentResidents)
  }

  $scope.addResident = (resId)=>{
  console.log("resId:", resId);
  Apartment.addNewResident($scope.apartment._id, resId)
    .then()
    .catch(err=>{
      console.log("error: ", err );
    })
  }

 $scope.removeResident = (resId)=>{
  console.log("resId:", resId);
  Apartment.removeResident($scope.apartment._id, resId)
    .then()
    .catch(err=>{
      console.log("error: ", err );
    })
  }
  
});


app.controller('residentListCtrl', function($scope, Resident) {
  Resident.getAll()
    .then(res =>{
      $scope.residents = res.data;
      console.log("$scope.residents:", $scope.residents);
    })
    .catch(err =>{
      console.log("err: ", err);
    })

    $scope.addResident = () =>{
      Resident.addResident($scope.newItem)
      .then(resident =>{
        $scope.residents.push(resident);
        $scope.newItem = {};
      })
      .catch(err=>{
        console.log("error: ", err );
      });
    }


  $scope.deleteResident = (ind, resident) =>{
    console.log("resident:", resident)
    Resident.deleteResident(resident._id)
    .then(resident => {
      //console.log("item to add", item);
      $scope.residents.splice(ind,1);
    })
    .catch(err=>{
      console.log("error: ", err );
    });
  }

  $scope.showUpdateForm = (index, resident) =>{
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
  }

});


app.controller('showResdientCtrl', function($scope, Resident, $stateParams) {
  console.log('showResdientCtrl!');
  console.log('$stateParams:', $stateParams);   //this will be resident id

  //or w/e my func is called
  Resident.getById($stateParams.residentId)
    .then(res =>{
      $scope.resident = res.data;
    })
});

app.controller('manageCtrl', function($scope, $stateParams, Apartment, Resident ) {
  console.log('manageCtrl!');

  //console.log("total Income", Apartment.allPropertyIncomes())
  
});




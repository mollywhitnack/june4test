'use strict';

const express = require('express');

const Apartment = require('../models/apartment');

let router = express.Router();

// apartments.js
// /api/apartments

router.get('/', (req, res)=>{
  Apartment.find({}, (err, apartments)=>{
    res.status(err ? 400 : 200).send(err || apartments);
  })
})

router.post('/', (req, res)=>{
  Apartment.create(req.body, (err, apartment)=>{
    res.status(err ? 400 : 200).send(err || apartment);
  })
})

router.route('/:id')
 .get((req, res) =>{
  Apartment.findById(req.params.id, (err, apartment) =>{
     res.status(err ? 400 : 200).send(err || apartment);
    });
  })
  .put((req, res) =>{
  Apartment.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, apartment) =>{
     res.status(err ? 400 : 200).send(err || apartment);
    });
  })
  .delete((req, res) =>{
  Apartment.findByIdAndRemove(req.params.id, err =>{
     res.status(err ? 400 : 200).send(err);
  });
});


  router.put('/:apartmentId/addResident/:residentId', (req, res)=>{

  Apartment.addResident(req.params.apartmentId, req.params.residentId, (err, savedApartment)=>{
    res.status(err ? 400 : 200).send(err || savedApartment);
  });
});


//remove resident from apartment
router.put('/:apartmentId/removeResident/:residentId', (req, res)=>{
  Apartment.findById(req.params.apartmentId, (err , apartment)=>{
    if(err || !apartment) return res.satus(400).send(err || 'apartment not found');
      var ind = apartment.residents.indexOf(req.params.residentId);
      apartment.residents.splice(ind, 1);
      apartment.save((err, savedApartment)=>{
      res.status(err? 400: 200).send(err || savedApartment)
    });
  });
});

module.exports = router;



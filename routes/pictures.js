'use strict';

const express = require('express');

const Picture = require('../models/picture');

let router = express.Router();

// pictures.js
// /api/pictures

router.get('/', (req, res)=>{

//can add more methods here now (exec in place of cb)
//limit limits number of pictures /*.limit(2) */
// populate -> git it key for object we want to populate
  Picture.find( {}, (err, pictures)=>{
    res.status(err ? 400 : 200).send(err || pictures);
  })
});

router.post('/', (req, res)=>{
  Picture.create(req.body, (err, picture)=>{
    res.status(err ? 400 : 200).send(err || picture);
  })
})

router.route('/:id')
 .get((req, res) =>{
  Picture.findById(req.params.id, (err, picture) =>{
     //if(err) return res.status(400)
     res.status(err ? 400 : 200).send(err || picture);
    });
  })
  .put((req, res) =>{
  Picture.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, picture) =>{
     res.status(err ? 400 : 200).send(err || picture);
    });
  })
  .delete((req, res) =>{
  Picture.findByIdAndRemove(req.params.id, err =>{
     res.status(err ? 400 : 200).send(err);
  });
});


module.exports = router;






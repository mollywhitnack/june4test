'use strict';

const express = require('express');

const Album = require('../models/album');

let router = express.Router();

// apartments.js
// /api/apartments

router.get('/', (req, res)=>{
  Album.find({}, (err, albums)=>{
    res.status(err ? 400 : 200).send(err || albums);
  })
})

router.post('/', (req, res)=>{
  Album.create(req.body, (err, album)=>{
    res.status(err ? 400 : 200).send(err || album);
  })
})

router.route('/:id')
 .get((req, res) =>{
  Album.findById(req.params.id, (err, album) =>{
     res.status(err ? 400 : 200).send(err || album);
    });
  })
  .put((req, res) =>{
  Album.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, album) =>{
     res.status(err ? 400 : 200).send(err || album);
    });
  })
  .delete((req, res) =>{
  Album.findByIdAndRemove(req.params.id, err =>{
     res.status(err ? 400 : 200).send(err);
  });
});


  router.put('/:albumId/addPicture/:photoId', (req, res)=>{
  Album.addPictureToAlbum(req.params.albumId, req.params.photoId, (err, savedAlbum)=>{
    res.status(err ? 400 : 200).send(err || savedAlbum);
  });
});


//remove resident from apartment
router.put('/:albumId/removePicture/:photoId', (req, res)=>{
  Album.findById(req.params.albumId, (err , album)=>{
    if(err || !album) return res.satus(400).send(err || 'album not found');
      var ind = album.picture.indexOf(req.params.photoId);
      album.picture.splice(ind, 1);
      album.save((err, savedAlbum)=>{
      res.status(err? 400: 200).send(err || savedAlbum)
    });
  });
});

module.exports = router;



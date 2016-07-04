  'use strict';

const mongoose = require('mongoose');

let albumSchema = new mongoose.Schema({
     name : {type: String},
     picture: [{type: mongoose.Schema.Types.ObjectId, ref: 'Picture'}]
});

let Album;

//cant use arrow functions
albumSchema.statics.addPictureToAlbum = function(albumId, picId, cb){
    //'this' is apartment model
    this.findById(albumId, (err, album)=>{
      if(err || !album) return cb(err || 'album not found');
       album.addPictureMethod(picId, cb);
    })
}


albumSchema.methods.addPictureMethod = function(picId, cb){
    console.log("THhis:", this.name);
    console.log("PicIc:", picId);
    this.picture.push(picId);
    this.save(cb);
}


Album =  mongoose.model('Album', albumSchema);

module.exports = Album;













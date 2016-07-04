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


//use: let totalRent = album.getPropertyIncome
/*albumSchema.methods.getPropertyIncome = function(albumId, cd){
    let tenants = this.pictures.length;
    var totalRent = tenants * this.rent;
    return totalRent;
}*/

//total rent for all properties
// use apartment.allPropertyIncomes((err, totalRent)=>{})
//get all partments  get property income for each
//will be asyncronous
/*albumSchema.statics.allPropertyIncomes = function(cb){
  this.find({}, (err, albums)=>{
    if(err) return cb(err);
    let totalRent = albums.reduce((total, album)=>{
      return total + album.getPropertyIncome();
    }, 0);
    cb(null, totalRent);
  });
}*/

Album =  mongoose.model('Album', albumSchema);

module.exports = Album;













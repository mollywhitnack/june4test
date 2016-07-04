  'use strict';

const mongoose = require('mongoose');

let apartmentSchema = new mongoose.Schema({
     address : {type: String},
     description: {type: String},
     rent: Number,
     picture: {type: String},
     maxOccupancy: Number,
     createdAt: { type: Date, default: Date.now },
     residents: [{type: mongoose.Schema.Types.ObjectId, ref: 'Resident'}]
});

let Apartment;

//cant use arrow functions
apartmentSchema.statics.addResident = function(apartmentId, residentId, cb){
    //'this' is apartment model
    this.findById(apartmentId, (err, apartment)=>{
      if(err || !apartment) return cb(err || 'apartment not found');
       apartment.addResidentMethod(residentId, cb);
    })
}


apartmentSchema.methods.addResidentMethod = function(residentId, cb){
  if(this.residents.length < this.maxOccupancy){
    this.residents.push(residentId);
    this.save(cb);
  }
  else{
    //check for error?
    //this.save(cb);
    cb('apartment at capacity');
  }
}


//use: let totalRent = apartment.getPropertyIncome
apartmentSchema.methods.getPropertyIncome = function(apartmentId, cd){
    let tenants = this.residents.length;
    var totalRent = tenants * this.rent;
    return totalRent;
}

//total rent for all properties
// use apartment.allPropertyIncomes((err, totalRent)=>{})
//get all partments  get property income for each
//will be asyncronous
apartmentSchema.statics.allPropertyIncomes = function(cb){
  this.find({}, (err, apartments)=>{
    if(err) return cb(err);
    let totalRent = apartments.reduce((total, apartment)=>{
      return total + apartment.getPropertyIncome();
    }, 0);
    cb(null, totalRent);
  });
}

Apartment =  mongoose.model('Apartment', apartmentSchema);

module.exports = Apartment;













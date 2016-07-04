'use strict';

const mongoose = require('mongoose');

let residentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: { type: String, default: 'na'},
  createdAt: { type: Date, default: Date.now },
  email: { type: String, match: /^\w+@\w+\.+\w+$/, required: true, trim: true, lowercase: true},
  //apartment: {type: mongoose.Schema.Types.ObjectId, ref: 'Apartment'}
});

let Resident;
//dont use arorw function becase we want 'this' document
residentSchema.methods.addAge = function (cb){
  console.log("this: ", this);
  this.age++;
  this.save(cb);
};


Resident =  mongoose.model('Resident', residentSchema);

module.exports = Resident;
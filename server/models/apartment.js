/* eslint-disable no-use-before-define, no-console */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    validate: { validator: duplicateAptNameValidator },
  },
  sqft: { type: Number, min: 500, max: 2500 },
  rooms: { type: Number, min: 1, max: 4 },
  rent: { type: Number, min: 1000 },
  deposit: { type: Number, min: 50 },
  collectedRent: { type: Number, default: 0, min: 0 },
  rentDue: { type: Number, min: 1, max: 28 },
  lateFee: { type: Number, min: 10 },
  renter: { type: mongoose.Schema.ObjectId, ref: 'Renter' },
  dateCreated: { type: Date, default: Date.now },
});

// lease
schema.methods.lease = function(tenant, cb) {
  console.log('tenant', tenant, 'cb', cb)
  if (tenant.money < this.deposit) return (new Error 'you need to have money for deposit', tenant.money, this.deposit)

  this.renter = tenant.id;
  schema.findandupdate()

}


// schema.methods.feed = function() {
//   // if (this.health <= 90) { this.health += 10
//   // } else {
//   //   this.health = 100;
//   // }
//
//
//   this.health = this.health <= 90 ? this.health += 10 : 100;
//
//   return this.health;
// };
//
// // schema.methods.feed = function(cb) {
// //   this.health += 10;
// //     cb(dog.health);
// //   });
// // };
//
//
function duplicateAptNameValidator(name, cb) {
  this.model('Apartment').find({ name }, (err, apartments) => {
    cb(!apartments.length);
  });
}

module.exports = mongoose.model('Apartment', schema);

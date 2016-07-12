/* eslint-disable no-use-before-define, no-console */

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const schema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
  },
  money: { type: Number, required: true, min: 1001 },
  apartment: { type: mongoose.Schema.ObjectId, ref: 'Apartment' },
  complaints: { type: Number, min: 0, max: 3, default:0 },
  dateCreated: { type: Date, default: Date.now },
});

// the user an pay their bill - minus money, + rent, late feed

// terminat 1 month fee. looses the

// pay
// schema.methods.pay = function() {
//   if (this.money < this.apartment.rent) return (new Error('Not enough money to pay rent', this.money, this.apartment.rent)
//
//   apartment.collectedRent +=
// }




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
// function duplicateDogNameValidator(name, cb) {
//   this.model('Dog').find({ name }, (err, dogs) => {
//     cb(!dogs.length);
//   });
// }

module.exports = mongoose.model('Renter', schema);

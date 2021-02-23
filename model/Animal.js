const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnimalSchema = new Schema({
  name: String,
  age: Number
});


module.exports = mongoose.model('Animal', AnimalSchema);


const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  
});

const Truck = mongoose.model('Truck', truckSchema);

module.exports = Truck;

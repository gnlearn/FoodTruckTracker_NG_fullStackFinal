const mongoose = require('mongoose');

const truckSchema = new mongoose.Schema({
  truckName: {
    type: String,
    required: true, 
    trim: true
  },
  cuisineType: {
    type: String,
    required: true, 
    trim: true
  },
  description: {
    type: String,
    required: true, 
    trim: true
  },
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  openTime: {
    type: String,
    required: true, 
    trim: true
  },
  closeTime: {
    type: String,
    required: true, 
    trim: true
  },
  address: {
    type: String,
    required: true, 
    trim: true
  },
  ownerID: {
    type: Number,
    required: true
  }
}, { 
  timestamps: true 
});

const Truck = mongoose.model('Truck', truckSchema);

module.exports = Truck;

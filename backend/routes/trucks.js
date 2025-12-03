const express = require("express");
const router = express.Router();


// Import models
const Truck = require("../models/Truck");

// Root route
router.get("/", (req, res) => {
  res.json({
    message: "FoodTruckTracker API",
    status: "Running",
    endpoints: {
      trucks: "/trucks",
    },
  });
});



module.exports = router;

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

//GET all trucks
router.get("/trucks", async (req, res) => {
  try {
    const trucks = await Truck.find();
    res.json(trucks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } 
});

//POST create a new truck
router.post("/trucks", async (req, res) => {
  try {
    
    const newTruck = new Truck(req.body);
    const savedTruck = await newTruck.save();

    res.status(201).json(savedTruck);
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//PUT update a truck
router.put("/trucks/:id", async (req, res) => {
  try {
    const updatedTruck = await Truck.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTruck) {
      return res.status(404).json({
        message: "Truck not found",
      });
    }

    res.json(updatedTruck);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE delete a truck
router.delete("/trucks/:id", async (req, res) => {
  try {
    const deletedTruck = await Truck.findByIdAndDelete(req.params.id);

    if (!deletedTruck) {
      return res.status(404).json({
        message: "Truck not found",
      });
    }

    res.json({
      message: "Truck deleted successfully",
      truck: deletedTruck,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

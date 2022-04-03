const express = require("express");
const plateController = require("../controllers/plateController");
const uploadImage = require("../middleware/uploadFile");
const router = express.Router();

// localhost:3000/plate/viewPlateRegister
router.get("/viewPlateRegister", plateController.viewForm);

// localhost:3000/plate/registerPlate
router.post("/registerPlate", uploadImage("plates"), plateController.registerplate);

// localhost:3000/plate/viewEditForm/:plate_id
router.get("/viewEditForm/:plate_id", plateController.viewEditForm);

// localhost:3000/plate/saveChanges/:plate_id/:chef_id
router.post("/saveChanges/:plate_id/:chef_id", plateController.saveChanges);

// localhost:3000/plate/deletePlate/:plate_id/:chef_id
router.get("/deletePlate/:plate_id/:chef_id", plateController.deletePlate);


module.exports = router;
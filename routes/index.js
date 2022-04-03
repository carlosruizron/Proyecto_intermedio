const express = require("express");
const indexController = require("../controllers/indexController");
const uploadImage = require("../middleware/uploadFile");
const router = express.Router();

/* GET home page. */
router.get('/', indexController.viewHome);

module.exports = router;

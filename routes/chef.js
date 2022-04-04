const express = require("express");
const chefController = require("../controllers/chefController");
const uploadImage = require("../middleware/uploadFile");
const router = express.Router();

// localhost:3000/chef/form
router.get('/form', chefController.viewForm);

// localhost:3000/chef/form/register
router.post("/form/register", chefController.registerChef)

// localhost:3000/chef/formLogin
router.get("/formLogin", chefController.viewFormLogin);

// localhost:3000/chef/login
router.post("/login", chefController.login);

// localhost:3000/chef/oneUSer/:chef_id
router.get("/oneUser/:chef_id",chefController.viewOneUser);

// localhost:3000/chef/oneChef/:chef_id
router.get("/oneChef/:chef_id",chefController.viewOneChef);

// localhost:3000/chef/viewEditForm/:chef_id
router.get("/viewEditForm/:chef_id/", chefController.viewEditForm);


// localhost:3000/chef/saveChanges/:chef_id
router.post("/saveChanges/:chef_id", uploadImage("chefs"), chefController.saveChanges);

module.exports = router;

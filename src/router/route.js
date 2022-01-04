const express = require("express");
const router = express.Router();
const userController = require("../controller/controllerFiles");

router.get("/findAll", userController.findAll);
router.post("/create", userController.create);
router.get("/findOne", userController.findOne);
router.put("/UpdateUser", userController.UpdateUser);
router.delete("/delete", userController.delete);
module.exports = router;
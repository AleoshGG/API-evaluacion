const express = require("express");
const router = express.Router();
const controllersAdmins = require("../controllers/admins");

// Rutas para los endpoints CRUD
router.get("/login/", controllersAdmins.login);
router.get("/getAll/", controllersAdmins.getAllAdmins);
router.post("/addAdmin/", controllersAdmins.addAdmin);
router.put("/updateAdmin/:id", controllersAdmins.updateAdmin);
router.delete("/deleteAdmin/:id", controllersAdmins.deleteAdmin);

module.exports = router;

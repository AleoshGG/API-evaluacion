const express = require("express");
const router = express.Router();
const controllersPublications = require("../controllers/publications");

// Rutas para los endpoints CRUD
router.get("/getAll/", controllersPublications.getAll);
router.post("/addPubli/", controllersPublications.addPublication);
router.put("/updatePubli/:id", controllersPublications.updatePublication);
router.delete("/deletePubli/:id", controllersPublications.deletePublicaction);

module.exports = router;

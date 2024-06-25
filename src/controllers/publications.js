const authenticateJWT = require("../config/authenticateJWT");
const db = require("../config/db");
//GET
exports.getAll = [
  authenticateJWT,
  (req, res) => {
    db.query(
      "SELECT titulo, contenido, nombre FROM administradores NATURAL JOIN publicaciones",
      (err, result) => {
        if (err) {
          res.status(500).send("Error al obtener las publicaciones");
          throw err;
        }
        res.json(result);
      }
    );
  },
];

//POST
exports.addPublication = [
  authenticateJWT,
  (req, res) => {
    const newPublication = req.body;

    db.query(
      "INSERT INTO publicaciones SET ?",
      newPublication,
      (err, result) => {
        if (err) {
          res.status(500).send("Error al agregar la publicacion");
          throw err;
        }
        res.status(201).send("Publicacion agregada correctamente");
      }
    );
  },
];

//PUT
exports.updatePublication = [
  authenticateJWT,
  (req, res) => {
    const id_publicacion = req.params.id;
    const publicacion = req.body;
    db.query(
      "UPDATE publicaciones SET ? WHERE id_publicacion = ?",
      [publicacion, id_publicacion],
      (err, result) => {
        if (err) {
          res.status(500).send("Error al actualizar el elemento");
          throw err;
        }
        res.send("Elemento actualizado correctamente");
      }
    );
  },
];

//DELETE
exports.deletePublicaction = [
  authenticateJWT,
  (req, res) => {
    const id_publicacion = req.params.id;
    db.query(
      "DELETE FROM publicaciones WHERE id_publicacion = ?",
      id_publicacion,
      (err, result) => {
        if (err) {
          res.status(500).send("Error al eliminar el elemento");
          throw err;
        }
        res.send("Elemento eliminado correctamente");
      }
    );
  },
];

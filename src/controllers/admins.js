require("dotenv").config();
const db = require("../config/db");
const authenticateJWT = require("../config/authenticateJWT");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM administradores WHERE email = ?",
    email,
    async (err, result) => {
      if (err) {
        res.status(500).send("Error en el servidor");
        throw err;
      }
      if (result.length === 0) {
        return res.status(401).send("Invalidas");
      }

      const user = result[0];
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(404).send("Credenciales Invalidas");
      }

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({
        message: "Credenciales válidas",
        token,
      });
    }
  );
};

//GET
exports.getAllAdmins = [
  authenticateJWT,
  (req, res) => {
    db.query("SELECT * FROM administradores", (err, result) => {
      if (err) {
        res.status(500).send("Error al obtener los usuarios");
        throw err;
      }
      res.json(result);
    });
  },
];

//POST
exports.addAdmin = (req, res) => {
  const newUser = req.body;

  bcrypt.hash(newUser.password, 10, (err, hash) => {
    if (err) {
      res.status(500).send("Error al hashear la contraseña");
      throw err;
    }
    newUser.password = hash;
    db.query("INSERT INTO administradores SET ?", newUser, (err, result) => {
      if (err) {
        res.status(500).send("Error al agregar el usuario");
        throw err;
      }
      res.status(201).send("Usuario agregado correctamente");
    });
  });
};

//PUT
exports.updateAdmin = [
  authenticateJWT,
  (req, res) => {
    const id_admin = req.params.id;
    const updatedUser = req.body;

    bcrypt.hash(updatedUser.password, 10, (err, hash) => {
      if (err) {
        res.status(500).send("Error al hashear la contraseña");
        throw err;
      }
      updatedUser.password = hash;
      db.query(
        "UPDATE administradores SET ? WHERE id_admin = ?",
        [updatedUser, id_admin],
        (err, result) => {
          if (err) {
            res.status(500).send("Error al actualizar el elemento");
            throw err;
          }
          res.send("Elemento actualizado correctamente");
        }
      );
    });
  },
];

//DELETE
exports.deleteAdmin = [
  authenticateJWT,
  (req, res) => {
    const id_admin = req.params.id;
    db.query(
      "DELETE FROM administradores WHERE id_admin = ?",
      id_admin,
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

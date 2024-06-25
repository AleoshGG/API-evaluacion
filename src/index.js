const express = require("express");
const bodyParser = require("body-parser");
const adminsRoutes = require("./routes/admins");
const publicationsRoutes = require("./routes/publications");

const app = express();
const port = 3000;

// Middleware para analizar los cuerpos de las solicitudes
app.use(bodyParser.json());

// Usar las rutas de los items
app.use("/admins", adminsRoutes);
app.use("/publications", publicationsRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor Express en ejecución en http://localhost:${port}`);
});

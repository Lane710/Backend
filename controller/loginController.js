const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/db');

const login = async (req, res) => {
  const { usuario, clave } = req.body;

  try {
    const result = await pool.query("SELECT * FROM usuarios WHERE usuario = $1", [usuario]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const match = await bcrypt.compare(clave, user.contrasena);

      if (match) {
        const token = jwt.sign({ check: true }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ mensaje: 'Autenticación correcta', token });
      } else {
        res.setHeader('WWW-Authenticate', 'Bearer realm="Access to the site", charset="UTF-8"');
        res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
      }
    } else {
      res.setHeader('WWW-Authenticate', 'Bearer realm="Access to the site", charset="UTF-8"');
      res.status(401).json({ mensaje: "Usuario o contraseña incorrectos" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Error de servidor");
  }
};

module.exports = {
  login,
};
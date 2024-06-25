const pool = require('../config/db');

// Listar personas
const ListarPersonas = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM personas");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error de servidor");
  }
};

// Agregar persona
const AgregarPersona = async (req, res) => {
  const { nombre, email, telefono, direccion } = req.body;

  // Validación básica de los campos requeridos
  if (!nombre || !email || !telefono || !direccion) {
    return res.status(400).json({
      mensaje: "Por favor, proporciona todos los campos: 'nombre', 'email', 'telefono' y 'direccion'."
    });
  }

  try {
    const result = await pool.query(
      "INSERT INTO personas (nombre, email, telefono, direccion) VALUES ($1, $2, $3, $4) RETURNING *",
      [nombre, email, telefono, direccion]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al agregar persona:", err);
    res.status(500).send("Error de servidor");
  }
};

// Modificar persona
const ModificarPersona = async (req, res) => {
  const { id } = req.params;
  const { nombre, email, telefono, direccion } = req.body;

  // Validación básica de los campos requeridos
  if (!nombre || !email || !telefono || !direccion) {
    return res.status(400).json({
      mensaje: "Por favor, proporciona todos los campos: 'nombre', 'email', 'telefono' y 'direccion'."
    });
  }

  try {
    const result = await pool.query(
      "UPDATE personas SET nombre = $1, email = $2, telefono = $3, direccion = $4 WHERE id = $5 RETURNING *",
      [nombre, email, telefono, direccion, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al modificar persona:", err);
    res.status(500).send("Error de servidor");
  }
};

// Eliminar persona
const EliminarPersona = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM personas WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ mensaje: "Persona no encontrada" });
    }

    res.json({ mensaje: "Persona eliminada correctamente" });
  } catch (err) {
    console.error("Error al eliminar persona:", err);
    res.status(500).send("Error de servidor");
  }
};

module.exports = {
  ListarPersonas,
  AgregarPersona,
  ModificarPersona,
  EliminarPersona
};

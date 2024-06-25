const bcrypt = require('bcrypt');
const pool = require('../config/db');

// Obtener todos los usuarios
const ObtenerUsuarios = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM usuarios');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).send('Error de servidor');
  }
};

// Obtener usuario por ID
const ObtenerUsuarioId = async (req, res) => {
  const { persona_id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE persona_id = $1', [persona_id]);

    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener usuario por ID:', error);
    res.status(500).send('Error de servidor');
  }
};

// Agregar un nuevo usuario
const AgregarUsuario = async (req, res) => {
  const { persona_id, usuario, contrasena, rol } = req.body;

  // Validación básica
  if (!persona_id || !usuario || !contrasena || !rol) {
    return res.status(400).send("Por favor, proporciona todos los campos: 'persona_id', 'usuario', 'contrasena' y 'rol'.");
  }

  try {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const result = await pool.query(
      'INSERT INTO usuarios (persona_id, usuario, contrasena, rol) VALUES ($1, $2, $3, $4) RETURNING *',
      [persona_id, usuario, hashedPassword, rol]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar usuario:', error);
    res.status(500).send('Error de servidor');
  }
};

// Modificar usuario por ID
const   ModificarUsuario = async (req, res) => {
  const { persona_id } = req.params;
  const { usuario, contrasena, rol } = req.body;

  try {
    // Verificar si el usuario existe en la base de datos
    const userResult = await pool.query('SELECT * FROM usuarios WHERE persona_id = $1', [persona_id]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ mensaje: 'El usuario no existe' });
    }

    // Si la contraseña está presente en la solicitud, encriptarla
    let hashedPassword = userResult.rows[0].contrasena; // Por defecto, usar la contraseña existente
    if (contrasena) {
      hashedPassword = await bcrypt.hash(contrasena, 10);
    }

    // Modificar los datos del usuario
    const updateResult = await pool.query(
      'UPDATE usuarios SET usuario = $1, contrasena = $2, rol = $3 WHERE persona_id = $4',
      [usuario, hashedPassword, rol, persona_id]
    );

    // Verificar si la actualización fue exitosa
    if (updateResult.rowCount === 0) {
      return res.status(500).json({ mensaje: 'No se pudo modificar el usuario' });
    }

    res.json({ mensaje: 'Usuario modificado correctamente' });
  } catch (error) {
    console.error('Error al actualizar usuario:', error);
    res.status(500).send('Error de servidor');
  }
};

// Eliminar usuario por ID
const EliminarUsuario = async (req, res) => {
  const { persona_id } = req.params;

  try {
    const userResult = await pool.query('SELECT * FROM usuarios WHERE persona_id = $1', [persona_id]);

    if (userResult.rows.length === 0) {
      return res.status(404).json({ mensaje: 'El usuario no existe' });
    }

    const deleteResult = await pool.query('DELETE FROM usuarios WHERE persona_id = $1', [persona_id]);

    if (deleteResult.rowCount === 0) {
      return res.status(500).json({ mensaje: 'No se pudo eliminar el usuario' });
    }

    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).send('Error de servidor');
  }
};

module.exports = {
  ObtenerUsuarios,
  ObtenerUsuarioId,
  AgregarUsuario,
    ModificarUsuario,
  EliminarUsuario,
};

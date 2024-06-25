const pool = require('../config/db');
//Listar Producto
const ListarProductos = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM productos");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error de servidor");
  }
};

//Agregar Producto
const AgregarProducto = async (req, res) => {
  const { nombre, descripcion, precio, stock, categoria, imagen_url } = req.body;

  // Validación básica de los campos requeridos
  if (!nombre || !descripcion || !precio || !stock || !categoria || !imagen_url) {
    return res.status(400).json({
      mensaje: "Por favor, proporciona todos los campos: 'nombre', 'descripcion', 'precio', 'stock', 'categoria' y 'imagen_url'."
    });
  }

  try {
    const result = await pool.query(
      "INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [nombre, descripcion, precio, stock, categoria, imagen_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error al agregar producto:", err);
    res.status(500).send("Error de servidor");
  }
};
// Modificar producto
const ModificarProducto = async (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, categoria, imagen_url } = req.body;

  // Validación básica de los campos requeridos
  if (!nombre || !descripcion || !precio || !stock || !categoria || !imagen_url) {
    return res.status(400).json({
      mensaje: "Por favor, proporciona todos los campos: 'nombre', 'descripcion', 'precio', 'stock', 'categoria' y 'imagen_url'."
    });
  }

  try {
    const result = await pool.query(
      "UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4, categoria = $5, imagen_url = $6 WHERE id = $7 RETURNING *",
      [nombre, descripcion, precio, stock, categoria, imagen_url, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error al modificar producto:", err);
    res.status(500).send("Error de servidor");
  }
};

// Eliminar producto
const EliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM productos WHERE id = $1 RETURNING *", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json({ mensaje: "Producto eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar producto:", err);
    res.status(500).send("Error de servidor");
  }
};

module.exports = {
  ListarProductos,
  AgregarProducto,
  ModificarProducto,
  EliminarProducto
};
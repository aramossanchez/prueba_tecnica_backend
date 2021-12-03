const express = require('express');
const router = express.Router();

//Importo modelo de datos
const OrderController = require('../controllers/OrderController');

// End-points CRUD movies
router.get('/', OrderController.obtenerTodos);
router.post('/nuevoregistro', OrderController.crearOrder);
router.put('/actualizarRegistro/:id', OrderController.actualizarOrder);
// router.delete('/:id', auth, PeliculaController.delete);

module.exports = router;
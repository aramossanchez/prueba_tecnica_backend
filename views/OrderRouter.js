const express = require('express');
const router = express.Router();

//Importo modelo de datos
const OrderController = require('../controllers/OrderController');

// End-points CRUD movies
router.get('/', OrderController.obtenerTodos);
// router.get('/:id', PeliculaController.getById);
// router.get('/titulo/:titulo', PeliculaController.getByTitulo);
// router.get('/ciudad/:ciudad', PeliculaController.getByCity);
// router.get('/ciudad/:ciudad/alquilada/:alquilada', PeliculaController.getByCityAndRented);
// router.get('/genero/:genero', PeliculaController.getByGenre);
// router.get('/actor_principal/:actor_principal', PeliculaController.getByMainCharacter);
// router.post('/', auth, PeliculaController.create);
// router.put('/:id', auth, PeliculaController.update);
// router.delete('/:id', auth, PeliculaController.delete);

module.exports = router;
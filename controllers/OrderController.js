//IMPORTAMOS BASE DE DATOS
const db = require("../models");
const orders = db.order;
const Op = db.Sequelize.Op; //IMPORTAMOS FUNCIONES ORM DE SEQUELIZE

const OrderController = {}; //CREAMOS EL OBJETO CONTROLADOR



//OBTENEMOS LISTADO DE TODAS LAS PELÍCULAS
OrderController.obtenerTodos = (req, res) => {

    orders.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Ha surgido algún error al intentar acceder a los pedidos."
        });
      });
  };

//-------------------------------------------------------------------------------------

//OBTENEMOS PELICULA POR ID
OrderController.getById = (req, res) => {
  const id = req.params.id;

  orders.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `No existe la película con el id ${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Ha surgido algún error al intentar acceder a la película con el id " + id + "."
      });
    });
};

//-------------------------------------------------------------------------------------

//OBTENEMOS PELICULA POR TITULO
OrderController.getByTitulo = (req, res) => {

  let titulo = req.params.titulo;
  
  orders.findAll( {where: {titulo: titulo}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha surgido algún error al intentar acceder a las películas."
      });
    });
};

//-------------------------------------------------------------------------------------

//OBTENEMOS PELICULA POR CIUDAD
OrderController.getByCity = (req, res) => {

  let ciudad = req.params.ciudad;
  
  orders.findAll( {where: {ciudad: ciudad}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha surgido algún error al intentar acceder a las películas."
      });
    });
};

//-------------------------------------------------------------------------------------

//OBTENEMOS PELICULA POR CIUDAD Y POR DISPONIBILIDAD PARA SER ALQUILADA
OrderController.getByCityAndRented = (req, res) => {

  let ciudad = req.params.ciudad;
  let rented = req.params.alquilada
  
  orders.findAll( {where: {ciudad: ciudad, alquilada: rented}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha surgido algún error al intentar acceder a las películas."
      });
    });
};

//-------------------------------------------------------------------------------------

//OBTENEMOS PELICULA POR GENERO
OrderController.getByGenre = (req, res) => {

  let genre = req.params.genero;
  
  orders.findAll( {where: {genero: genre}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha surgido algún error al intentar acceder a las películas."
      });
    });
};

//-------------------------------------------------------------------------------------

//OBTENEMOS PELICULA POR ACTOR PRINCIPAL
OrderController.getByMainCharacter = (req, res) => {

  let actor = req.params.actor_principal;
  
  orders.findAll( {where: {actor_principal: actor}})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Ha surgido algún error al intentar acceder a las películas."
      });
    });
};

//-------------------------------------------------------------------------------------

//CREAMOS PELÍCULA NUEVA
OrderController.create = (req, res) => {

  if (req.user.usuario.rol == "administrador") {// HACEMOS QUE SOLO PUEDA CREARLO EL ADMINISTRADOR
    
          if (!req.body.titulo) {
            res.status(400).send({
              message: "El contenido no puede estar vacío"
            });
            return;
          }
          
          const nuevaPelicula = {
            titulo: req.body.titulo,
            caratula: req.body.caratula,
            imagen_promocional: req.body.imagen_promocional,
            genero: req.body.genero,
            actor_principal: req.body.actor_principal,
            sinopsis: req.body.sinopsis,
            ciudad: req.body.ciudad,
            alquilada: req.body.alquilada
          };
          
          orders.create(nuevaPelicula)
            .then(data => {
              res.send(data);
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Ha surgido algún error al intentar crear la película."
              });
            });
  }else{
    res.send({
      message: `No tienes permisos para borrar orders. Contacta con un administrador.`
    });
  }
};

//-------------------------------------------------------------------------------------

//ACTUALIZAMOS PELICULA EXISTENTE
OrderController.update = (req, res) => {

  if (req.user.usuario.rol == "administrador") {// HACEMOS QUE SOLO PUEDA ACTUALIZARLO EL ADMINISTRADOR

          const id = req.params.id;

          orders.update(req.body, {
            where: { id: id }
          })
            .then(num => {
              if (num == 1) {
                res.send({
                  message: "La película ha sido actualizada correctamente."
                });
              } else {
                res.send({
                  message: `No se ha podido actualizar la película con el id ${id}`
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Ha surgido algún error al intentar actualizar la película con el id " + id + "."
              });
            });
  }else{
    res.send({
      message: `No tienes permisos para actualizar la información de la película. Contacta con un administrador.`
    });
  }
};

//-------------------------------------------------------------------------------------

//BORRAMOS PELICULA, BUSCANDO POR ID
OrderController.delete = (req, res) => {

  if (req.user.usuario.rol == "administrador") {// HACEMOS QUE SOLO PUEDA BORRARLO EL ADMINISTRADOR

        const id = req.params.id;

        orders.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: `La película con id ${id} ha sido eliminada correctamente.`
                    });
                } else {
                    res.send({
                        message: `No se ha podido eliminar la película con id ${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Ha surgido algún error al intentar borrar la película con el id " + id
                });
            });
  }else{
    res.send({
      message: `No tienes permisos para borra la película. Contacta con un administrador.`
    });
  }
};

//-------------------------------------------------------------------------------------

module.exports = OrderController;
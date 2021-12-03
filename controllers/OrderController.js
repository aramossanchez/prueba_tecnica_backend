//IMPORTAMOS BASE DE DATOS
const db = require("../models");
const orders = db.order;
const Op = db.Sequelize.Op; //IMPORTAMOS FUNCIONES ORM DE SEQUELIZE

const OrderController = {}; //CREAMOS EL OBJETO CONTROLADOR



//OBTENEMOS LISTADO DE TODAS LAS ORDERS
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

//CREAR NUEVA ORDER
OrderController.crearOrder = (req, res) => {
    
          if (!req.body.order_id) {
            res.status(400).send({
              message: "El contenido no puede estar vacío"
            });
            return;
          }
          
          const nuevaOrder = {
            order_id: req.body.order_id,
            country: req.body.country,
            ship_date: req.body.ship_date,
            company_name: req.body.company_name,
            status: req.body.status,
            type: req.body.type,
          };
          
          orders.create(nuevaOrder)
            .then(data => {
              res.send(data);
            })
            .catch(err => {
              res.status(500).send({
                message:
                  err.message || "Ha surgido algún error al intentar crear la película."
              });
            });
};

//-------------------------------------------------------------------------------------

//ACTUALIZAR ORDER EXISTENTE
OrderController.actualizarOrder = (req, res) => {

          const id = req.params.id;

          orders.update(req.body, {
            where: { id: id }
          })
            .then(order => {
              if (order == 1) {
                res.send({
                  message: "El pedido se ha actualizado correctamente."
                });
              } else {
                res.send({
                  message: `No se ha podido actualizar el pedido con el id ${id}`
                });
              }
            })
            .catch(err => {
              res.status(500).send({
                message: "Ha surgido algún error al intentar actualizar el pedido con el id " + id + "."
              });
            });
};

//-------------------------------------------------------------------------------------

//BORRAMOS PEDIDO BUSCADO POR ID
OrderController.borrarOrder = (req, res) => {

        const id = req.params.id;

        orders.destroy({
            where: { id: id }
        })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: `El pedido con id ${id} ha sido eliminado correctamente.`
                    });
                } else {
                    res.send({
                        message: `No se ha podido eliminar el pedido con id ${id}.`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Ha surgido algún error al intentar borrar la película con el id " + id
                });
            });
};

//-------------------------------------------------------------------------------------

module.exports = OrderController;
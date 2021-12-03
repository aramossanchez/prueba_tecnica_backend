const router = require('express').Router();

const OrderRouter = require('./views/OrderRouter');

router.use('/orders', OrderRouter); 

module.exports = router;
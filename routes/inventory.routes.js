const express = require('express');
const router = express.Router();
const controller = require('../controllers/inventory.controller');

router.post('/products', controller.createProduct);
router.get('/inventories', controller.getAll);
router.get('/inventories/:id', controller.getById);
router.post('/inventory/add-stock', controller.addStock);
router.post('/inventory/remove-stock', controller.removeStock);
router.post('/inventory/reservation', controller.reservation);
router.post('/inventory/sold', controller.sold);

module.exports = router;
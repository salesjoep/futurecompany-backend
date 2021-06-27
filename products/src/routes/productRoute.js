const express = require('express');
const createProduct = require('../controller/productCreateController');
const readProduct = require('../controller/productReadController');
const updateProduct = require('../controller/productUpdateControlller');

const router = express.Router();

router.post('/create', createProduct.createProduct);
router.post('/find', readProduct.getProducts);
router.post('/find/:id', readProduct.getProduct);
router.patch('/update/:id', updateProduct.updateProduct);
router.delete('/delete/:id', updateProduct.deleteProduct);

module.exports = router;
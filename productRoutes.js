const express = require('express');
const { protect } = require('./authentication');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../authentication');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);

router.use(protect);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;

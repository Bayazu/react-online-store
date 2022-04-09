const Router = require('express')
const router = new Router
const productController = require('../controllers/productController')

router.get('/listing', productController.listing)
router.get('/current/:id', productController.product)
router.post('/new', productController.new)
router.patch('/modify', productController.modify)
router.delete('/delete', productController.delete)

module.exports = router
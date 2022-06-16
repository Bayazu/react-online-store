const Router = require('express')
const router = new Router
const productController = require('../controllers/productController')

router.get('/listing', productController.listing)
router.get('/current/:id', productController.current)
router.get('/listingWithTag', productController.listingWithTag)
router.post('/new', productController.new)
router.patch('/modify/:id', productController.modify)
router.delete('/delete/:id', productController.delete)
router.post("/findProduct", productController.findProduct)

module.exports = router
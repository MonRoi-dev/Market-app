import {Router} from 'express'
import userController from '../controllers/userController.mjs'
import productController from '../controllers/productController.mjs'
import adminController from '../controllers/adminController.mjs'
import emailController from '../controllers/emailController.mjs'

const router = Router()

router.get('/', adminController.getAdmin)
router.get('/users', userController.getAllUsers)
router.post('/product', productController.createProduct)
router.put('/product/:id', productController.updateProduct)
router.delete('/product/:id', productController.deleteProduct)
router.post('/emailOne', emailController.emailOne)
router.post('/emailAll', emailController.emailAll)
router.get('/orders', adminController.getOrders)

export default router
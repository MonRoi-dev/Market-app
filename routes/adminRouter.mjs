import {Router} from 'express'
import userController from '../controllers/userController.mjs'
import productController from '../controllers/productController.mjs'
import adminController from '../controllers/adminController.mjs'

const router = Router()

router.get('/', adminController.getAdmin)
router.get('/users', userController.getAllUsers)
router.post('/product', productController.createProduct)
router.put('/product/:id', productController.updateProduct)
router.delete('/product/:id', productController.deleteProduct)

export default router
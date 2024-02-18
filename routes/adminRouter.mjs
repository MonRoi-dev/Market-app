import {Router} from 'express'
import userController from '../controllers/userController.mjs'
import productController from '../controllers/productController.mjs'

const router = Router()

router.post('/create', productController.createProduct)
router.post('/update', productController.updateProduct)
router.post('/delete', productController.deleteProduct)
router.get('/users', userController.getAllUsers)

export default router
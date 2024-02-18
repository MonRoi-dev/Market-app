import {Router} from 'express'
import productController from '../controllers/productController.mjs'

const router = Router()

router.post('/create', productController.createProduct)
router.post('/update', productController.updateProduct)

export default router
import {Router} from 'express'
import productController from '../controllers/productController.mjs'

const router = Router()

router.get('/product/:id', productController.getProduct)

export default router
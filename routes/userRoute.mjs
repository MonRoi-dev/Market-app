import {Router} from 'express'
import userController from '../controllers/userController.mjs'

const router = Router()

router.get('/user', userController.getUser)
router.post('/user', userController.signOut)

router.get('/user/cart', userController.getCart)
router.post('/user/cart', userController.postCart)
router.post('/product/:id', userController.addToCart)
router.delete('/user/product/:id', userController.deleteFromCart)

export default router
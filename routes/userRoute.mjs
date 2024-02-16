import {Router} from 'express'
import userController from '../controllers/userController.mjs'

const router = Router()

router.get('/user', userController.getUser)
router.post('/user', userController.signOut)

export default router
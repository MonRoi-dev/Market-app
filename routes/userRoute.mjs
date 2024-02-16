import {Router} from 'express'
import userController from '../controllers/userController.mjs'

const router = Router()

router.get('/user', userController.getUser)

export default router
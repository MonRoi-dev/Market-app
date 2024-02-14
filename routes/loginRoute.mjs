import {Router} from 'express'
import loginController from '../controllers/loginController.mjs'

const router = Router()

router.get('/login', loginController.getLogin)
router.post('/login', loginController.postLogin)

export default router
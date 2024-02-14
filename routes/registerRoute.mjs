import {Router} from 'express'
import registerController from '../controllers/registerController.mjs'

const router = Router()

router.get('/register', registerController.getRegister)
router.post('/register', registerController.postRegister)

export default router
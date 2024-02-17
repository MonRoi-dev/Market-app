import {Router} from 'express'
import userController from '../controllers/userController.mjs'
import adminController from '../controllers/adminController.mjs'

const router = Router()

router.get('/user', userController.getUser)
router.post('/user', userController.signOut)
router.get('/admin', adminController.getAdmin)

export default router
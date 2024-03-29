import {Router} from 'express'
import {check} from 'express-validator'
import loginController from '../controllers/loginController.mjs'

const router = Router()

router.get('/login', loginController.getLogin)
router.post('/login', [
    check('email', 'Invalid email type').isEmail(),
    check('password', 'Password should be at least 4 letters').isLength({
    min: 4,
    max: 16,
})],loginController.postLogin)

export default router
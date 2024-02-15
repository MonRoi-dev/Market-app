import {Router} from 'express'
import {check} from 'express-validator'
import registerController from '../controllers/registerController.mjs'

const router = Router()

router.get('/register', registerController.getRegister)
router.post('/register', [
    check('first_name', 'First name should not be empty').notEmpty(),
    check('last_name', 'Last name should not be empty').notEmpty(),
    check('email', 'Invalid email type').isEmail(),
    check('password', 'Password should be at least 4 letters').isLength({
        min: 4,
        max: 16,
    })
],registerController.postRegister)

export default router
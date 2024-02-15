import User from '../models/userModel.mjs';
import bcrypt from 'bcrypt';
import {validationResult} from 'express-validator'

class Register {
	async getRegister(req, res) {
		try {
			res.render('register', { title: 'Registration' });
		} catch (err) {
			console.log(err);
		}
	}
	async postRegister(req, res) {
		try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: 'Registration error', errors });
            }
			const userData = req.body;
			const checkUserByEmail = await User.find({
				email: userData.email,
			});
			if (checkUserByEmail.length != 0) {
				res.status(400).json({message: 'Email already taken!'})
			} else {
				const passwordHashed = await bcrypt.hash(userData.password, 4);
				const user = new User({
					first_name: userData.first_name,
					last_name: userData.last_name,
					email: userData.email,
					password: passwordHashed,
				});
				await user.save();
			}
			res.redirect('/');
		} catch (err) {
			console.log(err);
		}
	}
}

export default new Register();

import User from '../models/userModel.mjs';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

function generateAccessToken(id) {
	const payload = {
		id,
	};
	return jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });
}

class Login {
	async getLogin(req, res) {
		try {
			res.render('login', { title: 'Login' });
		} catch (err) {
			res.status(500).json({ message: `Server Error: ${err}` });
		}
	}
	async postLogin(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const msg = errors.errors[0].msg
				return res
					.status(400)
					.json({ message: msg });
			}
			const userData = req.body;
			const user = await User.findOne({ email: userData.email });

			if (!user) {
				return res.status(400).json({ message: 'User not found' });
			}

			const comparePasswords = await bcrypt.compare(
				userData.password,
				user.password
			);

			if (!comparePasswords) {
				return res.status(400).json({ message: 'Wrong password' });
			}
			const token = generateAccessToken(user.id);
			res.cookie('jwt', token);
			res.redirect('/');
		} catch (err) {
			res.status(500).json({ message: `Server Error: ${err}` });
		}
	}
}

export default new Login();

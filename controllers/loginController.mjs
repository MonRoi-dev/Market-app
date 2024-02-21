import User from '../models/userModel.mjs';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

function generateAccessToken(id, role) {
	const payload = {
		id,
		role,
	};
	return jwt.sign(payload, process.env.SECRET, { expiresIn: '24h' });
}

class Login {
	async getLogin(req, res) {
		try {
			res.render('login', { title: 'Login'});
		} catch (err) {
			res.status(500).render('serverErrorPage', {message: `Server Error: ${err}`, title: 'Error'})
		}
	}
	async postLogin(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const msg = errors.errors[0].msg;
				return res.status(400).json({ message: msg });
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
			const token = generateAccessToken(user.id, user.role);
			res.cookie('jwt', token);
			res.redirect('/');
		} catch (err) {
			res.status(500).render('serverErrorPage', {message: `Server Error: ${err}`, title: 'Error'})
		}
	}
}

export default new Login();

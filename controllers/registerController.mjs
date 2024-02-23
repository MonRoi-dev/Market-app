import User from '../models/userModel.mjs';
import bcrypt from 'bcrypt';
import jwt, { decode } from 'jsonwebtoken'
import 'dotenv/config'
import {validationResult} from 'express-validator'
import { transporter } from '../middlewares/tokenMiddleware.mjs';
import userModel from '../models/userModel.mjs';

function createVerifyToken(data){
	return jwt.sign({ 
        data
    }, process.env.SECRET , { expiresIn: '10m' }   
);     
}

class Register {

	async getRegister(req, res) {
		try {
			res.render('register', { title: 'Registration'});
		} catch (err) {
			res.status(500).render('serverErrorPage', {message: `Server Error: ${err}`, title: 'Error'})
		}
	}

	async postRegister(req, res) {
		try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
				const msg = errors.errors[0].msg
				return res
					.status(400)
					.json({ message: msg });
            }
			const userData = req.body;
			const checkUserByEmail = await User.find({
				email: userData.email,
			});
			if (checkUserByEmail.length != 0) {
				res.status(400).json({message: 'Email already taken!'})
			} else {
				userData.password = await bcrypt.hash(userData.password, 4);
				const token = createVerifyToken(userData)
				await transporter.sendMail({
					from: `"Market" ${process.env.USER}`,
					to: userData.email,
					subject: 'This mail sent automaticly do not reply!', 
					html: `<b>http://localhost:3000/register/${token}<b>`, 
				  });
			}
			res.redirect('/');
		} catch (err) {
			res.status(500).render('serverErrorPage', {message: `Server Error: ${err}`, title: 'Error'})
		}
	}

	async verifyRegister(req, res){
		try{
			const {token} = req.params
			const {data: userData} = await jwt.verify(token, process.env.SECRET)

			const findUserByEmail = await userModel.find({email: userData.email})
			if(findUserByEmail.length !== 0){
				return res.status(400).send('User already verified!')
			}
			const user = new userModel({
				first_name: userData.first_name,
				last_name: userData.last_name,
				email: userData.email,
				password: userData.password,
			})
			await user.save()

			res.status(200).send('Successfully verified!')
		}catch(err){
			res.status(500).render('serverErrorPage', {message: `Server Error: ${err}`, title: 'Error'})
		}
	}

}

export default new Register();

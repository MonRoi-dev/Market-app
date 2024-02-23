import UserModel from '../models/userModel.mjs';
import { transporter } from '../middlewares/tokenMiddleware.mjs';
import 'dotenv/config';

class Email {
	async emailOne(req, res) {
		try {
			const {email, text} = req.body;
            await transporter.sendMail({
                from: `"Market" ${process.env.USER}`,
                to: email,
                subject: 'This mail sent automaticly do not reply!', 
                text: text,
                html: `<b>${text}</b>`, 
              });
			res.redirect('/admin');
		} catch (err) {
			res.status(500).render('serverErrorPage', {
				message: `Server Error: ${err}`,
				title: 'Error',
			});
		}
	}

	async emailAll(req, res) {
		try {
			const text = req.body.text;
            const emails = []
			const users = await UserModel.find({}, 'email');
            users.forEach(user => {
                emails.push(user.email)
            });
            await transporter.sendMail({
                from: `"Market" ${process.env.USER}`,
                to: emails,
                subject: 'This mail sent automaticly do not reply!', 
                text: text,
                html: `<b>${text}</b>`, 
              });
			res.redirect('/admin');
		} catch (err) {
			res.status(500).render('serverErrorPage', {
				message: `Server Error: ${err}`,
				title: 'Error',
			});
		}
	}
}

export default new Email();

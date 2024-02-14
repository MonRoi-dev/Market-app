class Login {
	getLogin(req, res) {
		res.render('login', { title: 'Login' });
	}
    postLogin(req, res) {
        const data = req.body
        console.log(req.body)
		res.redirect('/')
	}
}

export default new Login();

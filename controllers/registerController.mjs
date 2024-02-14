class Register{
    getRegister(req, res){
        res.render('register', {title: 'Registration'})
    }
    postRegister(req,res){
        const data = req.body
        console.log(data)
        res.redirect('/')
    }
}

export default new Register()
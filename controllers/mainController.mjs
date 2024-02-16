class Main{
    getMain(req, res){
        res.render('index', {
            title: 'Express app',
            token: req.cookies.jwt
        });
    }
}

export default new Main()
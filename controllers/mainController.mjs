class Main{
    getMain(req, res){
        res.render('index', {
            title: 'Express app'
        });
    }
}

export default new Main()
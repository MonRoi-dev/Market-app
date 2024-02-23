import Orders from '../models/orderModel.mjs';

class Admin{
    getAdmin(req, res){
        try{
            if(!req.cookies.jwt){
                res.status(428)
                return res.redirect('/login')
            }
            if(req.app.locals.role != 'ADMIN'){
                res.status(404).render('notFoundPage', {
                    title: 'Page not found'
                });
            }
            res.render('admin', {title: 'Admin panel'})
        }catch(err){
            res.status(500).render('serverErrorPage', {message: `Server Error: ${err}`, title: 'Error'})
        }
    }

    async getOrders(req, res){
        try{
            const orders = await Orders.find({})
            orders.reverse()
            res.render('orders', {title: 'Orders', orders})
        }catch(err){
            res.status(500).render('serverErrorPage', {message: `Server Error: ${err}`, title: 'Error'})
        }
    }

}

export default new Admin()
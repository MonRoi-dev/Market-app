import ProductModel from '../models/productModel.mjs'

class Main{
    async getMain(req, res){
            try{
                const getAllProducts = await ProductModel.find({})
                res.render('index', {
                    title: 'Market app',
                    products: getAllProducts.reverse()
                });
            }catch(err){
                res.status(500).render('serverErrorPage', {message: `Server Error: ${err}`, title: 'Error'})
            }
        }
}

export default new Main()
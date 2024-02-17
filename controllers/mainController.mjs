import ProductModel from '../models/productModel.mjs'

class Main{
    async getMain(req, res){
            try{
                const getAllProducts = await ProductModel.find({})
                console.log(getAllProducts)
                res.render('index', {
                    title: 'Market app',
                    products: getAllProducts
                });
            }catch(err){
                res.status(500).json({message: `Server Error: ${err}`})
            }
        }
}

export default new Main()
import ProductModel from '../models/productModel.mjs'

class Product{

    async createProduct(req, res){
        try{
            const product = new ProductModel({
                name: '',
                info: '',
                image: '',
                price: 0
            })
            await product.save()
        }catch(err){
            res.status(500).json({message: `Server Error: ${err}`})
        }
    }

    async getProducts(req, res){
        try{
            const getAllProducts = await ProductModel.find({}).lean()
            console.log(getAllProducts)
        }catch(err){
            res.status(500).json({message: `Server Error: ${err}`})
        }
    }
    
}

export default new Product()
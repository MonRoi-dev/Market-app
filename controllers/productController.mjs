import ProductModel from '../models/productModel.mjs'

class Product{

    async createProduct(req, res){
        try{
            const data = req.body
            const product = new ProductModel({
                name: data.product_name,
                info: data.product_info,
                image: data.image_link,
                price: data.product_price
            })
            await product.save()
            res.redirect('/')
        }catch(err){
            res.status(500).json({message: `Server Error: ${err}`})
        }
    }
    
}

export default new Product()
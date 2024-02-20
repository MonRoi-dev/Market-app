import ProductModel from '../models/productModel.mjs';

class Product {
	async createProduct(req, res) {
		try {
			const data = req.body;
			if(!data.name){
				res.status(400).json({ message: 'Missing Name' });
			}
			const product = new ProductModel({
				name: data.name,
				info: data.info,
				image: data.image || undefined,
				price: data.price,
			});
			await product.save();
			res.redirect('/');
		} catch (err) {
			res.status(500).json({ message: `Server Error: ${err}` });
		}
	}

	async getProduct(req, res) {
		try {
			const id = req.params.id;
			const product = await ProductModel.findById(id);
			const data = {
				id,
				name: product.name,
				info: product.info,
				price: product.price,
				image: product.image,
			};
			res.render('product', { title: data.name, data });
		} catch (err) {
			res.status(500).json({ message: `Server Error: ${err}` });
		}
	}

	async updateProduct(req, res) {
		try {
			const id = req.params.id
			const data = req.body;
			if(!id){
				res.status(400).json({ message: 'Missing data' });
			}
            let dataToUpdate = {}
            for (const [key, value] of Object.entries(data)) {
                if(value){
                    dataToUpdate[key] = value
                }
              }
			await ProductModel.findByIdAndUpdate(id, dataToUpdate,{ new: true });
			res.redirect('/');
		} catch (err) {
			res.status(500).json({ message: `Server Error: ${err}` });
		}
	}

    async deleteProduct(req, res){
        try{
            const {id} = req.params
			if(!id){
				res.status(400).json({ message: 'Missing id' });
			}
            await ProductModel.findByIdAndDelete(id);
			res.redirect('/');
        }catch(err){
            res.status(500).json({ message: `Server Error: ${err}` });
        }
    }

}

export default new Product();

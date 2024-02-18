import ProductModel from '../models/productModel.mjs';

class Product {
	async createProduct(req, res) {
		try {
			const data = req.body;
			const product = new ProductModel({
				name: data.product_name,
				info: data.product_info,
				image: data.image_link || undefined,
				price: data.product_price,
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
			const data = req.body;
            let dataToUpdate = {}
            for (const [key, value] of Object.entries(data)) {
                if(value){
                    dataToUpdate[key] = value
                }
              }
			await ProductModel.findByIdAndUpdate(dataToUpdate.id, dataToUpdate,{ new: true });
			res.redirect('/');
		} catch (err) {
			res.status(500).json({ message: `Server Error: ${err}` });
		}
	}
}

export default new Product();

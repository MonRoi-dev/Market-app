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
			res.status(500).render('serverErrorPage', {message: `Server Error: ${err}`, title: 'Error'})
		}
	}

	async getProduct(req, res) {
		try {
			const id = req.params.id;
			if(id.length !== 24){
				return res.status(404).render('notFoundPage', {
					title: 'Page not found'
				});
			}
			const product = await ProductModel.findById(id);
			if(!product){
				return res.status(404).render('notFoundPage', {
					title: 'Page not found'
				});
			}
			res.render('product', { title: product.name, data: product });
		} catch (err) {
			res.status(500).render('serverErrorPage', {message: `Server Error: ${err}`, title: 'Error'})
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
			res.status(500).render('serverErrorPage', {message: `Server Error: ${err}`, title: 'Error'})
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
            res.status(500).render('serverErrorPage', {message: `Server Error: ${err}`, title: 'Error'})
        }
    }

}

export default new Product();

import UserModel from '../models/userModel.mjs';
import ProductModel from '../models/productModel.mjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

class User {
	async getUser(req, res) {
		try {
			if (!req.cookies.jwt) {
				res.status(428);
				return res.redirect('/login');
			}
			const userJWT = jwt.verify(req.cookies.jwt, process.env.SECRET);
			const userData = await UserModel.findById(userJWT.id);
			const clientData = {
				name: userData.first_name + ' ' + userData.last_name,
				email: userData.email,
			};
			res.render('user', { title: 'Profile', data: clientData });
		} catch (err) {
			res.status(500).json({ message: `Server Error: ${err}` });
		}
	}

	async signOut(req, res) {
		try {
			res.clearCookie('jwt');
			res.redirect('/');
		} catch (err) {
			res.status(500).json({ message: `Server Error: ${err}` });
		}
	}

	async getAllUsers(req, res) {
		try {
			const users = await UserModel.find({});
			res.render('users', { title: 'Users', users });
		} catch (err) {
			res.status(500).json({ message: `Server Error: ${err}` });
		}
	}

	async addToCart(req, res) {
		try {
			const productId = req.params.id;
			const token = req.cookies.jwt;
			const product = await ProductModel.findById(productId);
			if (product) {
				if (token) {
                    const userId = jwt.verify(token, process.env.SECRET);
                    const user = await UserModel.findById(userId.id);
                    const ids = user.cart.map(product => product._id.toString());
                    const qntyOfProduct = ids.filter(cartId => cartId === productId.toString());
                    if (qntyOfProduct.length !== 0) {
                        const existingProductIndex = user.cart.findIndex(item => item._id.toString() === productId.toString());
                        user.cart[existingProductIndex].qnty++;
                    } else {
                        user.cart.push({ _id: productId, qnty: 1 });
                    }
                    await user.save();
                }
			}
			res.redirect('/user/cart');
		} catch (err) {
			res.status(500).json({ message: `Server Error: ${err}` });
		}
	}

	async getCart(req, res) {
		try {
			const token = req.cookies.jwt;
			if (token) {
				const userId = jwt.verify(token, process.env.SECRET);
				const user = await UserModel.findById(userId.id);
				const products = [];
				for (const productId of user.cart) {
					const product = await ProductModel.findById(productId);
					products.push(product);
				}
				res.render('cart', { title: 'Cart', products, cart: user.cart });
			}
		} catch (err) {
			res.status(500).json({ message: `Server Error: ${err}` });
		}
	}

    async deleteFromCart(req, res){
        try{
            const token = req.cookies.jwt;
            const productId = req.params.id
			if (token) {
				const userId = jwt.verify(token, process.env.SECRET);
				const user = await UserModel.findById(userId.id);
                const product = user.cart.findIndex(product => product._id.toString() === productId)
                if(user.cart[product].qnty > 1){
                    user.cart[product].qnty -= 1
                }else{
                    user.cart.splice(product, 1)
                }
                await user.save()
                res.redirect('/user/cart')
            }
        }catch(err){
            res.status(500).json({ message: `Server Error: ${err}` });
        }
    }

}

export default new User();

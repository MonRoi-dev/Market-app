import UserModel from '../models/userModel.mjs';
import ProductModel from '../models/productModel.mjs';
import OrderModel from '../models/orderModel.mjs';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

class User {
	async getUser(req, res) {
		try {
			if (!req.cookies.jwt) {
				res.status(428);
				return res.redirect('/login');
			}
			const userJWT = await jwt.verify(req.cookies.jwt, process.env.SECRET);
			const userData = await UserModel.findById(userJWT.id);
			const clientData = {
				name: userData.first_name + ' ' + userData.last_name,
				email: userData.email,
			};
			res.render('user', { title: 'Profile', data: clientData });
		} catch (err) {
			res.status(500).render('serverErrorPage', {
				message: `Server Error: ${err}`,
				title: 'Error',
			});
		}
	}

	async signOut(req, res) {
		try {
			res.clearCookie('jwt');
			res.redirect('/');
		} catch (err) {
			res.status(500).render('serverErrorPage', {
				message: `Server Error: ${err}`,
				title: 'Error',
			});
		}
	}

	async getAllUsers(req, res) {
		try {
			const users = await UserModel.find({});
			res.render('users', { title: 'Users', users });
		} catch (err) {
			res.status(500).render('serverErrorPage', {
				message: `Server Error: ${err}`,
				title: 'Error',
			});
		}
	}

	async addToCart(req, res) {
		try {
			const productId = req.params.id;
			const token = req.cookies.jwt;
			const product = await ProductModel.findById(productId);
			if (product) {
				if (token) {
					const userId = await jwt.verify(token, process.env.SECRET);
					const user = await UserModel.findById(userId.id);
					const ids = user.cart.map((product) =>
						product._id.toString()
					);
					const qntyOfProduct = ids.filter(
						(cartId) => cartId === productId.toString()
					);
					if (qntyOfProduct.length !== 0) {
						const existingProductIndex = user.cart.findIndex(
							(item) =>
								item._id.toString() === productId.toString()
						);
						user.cart[existingProductIndex].qnty++;
					} else {
						user.cart.push({ _id: productId, qnty: 1 });
					}
					await user.save();
				}
			}
			res.redirect('/');
		} catch (err) {
			res.status(500).render('serverErrorPage', {
				message: `Server Error: ${err}`,
				title: 'Error',
			});
		}
	}

	async getCart(req, res) {
		try {
			const token = req.cookies.jwt;
			if (token) {
				const userId = await jwt.verify(token, process.env.SECRET);
				const user = await UserModel.findById(userId.id);
				const products = [];
				for (const productId of user.cart) {
					const product = await ProductModel.findById(productId);
					if (product) {
						products.push(product);
					}
				}
				res.render('cart', {
					title: 'Cart',
					products,
					cart: user.cart,
				});
			}
		} catch (err) {
			res.status(500).render('serverErrorPage', {
				message: `Server Error: ${err}`,
				title: 'Error',
			});
		}
	}

	async deleteFromCart(req, res) {
		try {
			const token = req.cookies.jwt;
			const productId = req.params.id;
			if (token) {
				const userId = await jwt.verify(token, process.env.SECRET);
				const user = await UserModel.findById(userId.id);
				const product = user.cart.findIndex(
					(product) => product._id.toString() === productId
				);
				if (user.cart[product].qnty > 1) {
					user.cart[product].qnty -= 1;
				} else {
					user.cart.splice(product, 1);
				}
				await user.save();
				res.redirect('/user/cart');
			}
		} catch (err) {
			res.status(500).render('serverErrorPage', {
				message: `Server Error: ${err}`,
				title: 'Error',
			});
		}
	}

	async postCart(req, res) {
		try {
			const { products, totalPrice } = req.body;
			const { id: userId } = await jwt.verify(
				req.app.locals.token,
				process.env.SECRET
			);
			const order = await new OrderModel({
				products,
				totalPrice,
				userId,
			});
			await order.save();
			await UserModel.findByIdAndUpdate(userId, {cart: []});
			res.redirect('/');
		} catch (err) {
			res.status(500).render('serverErrorPage', {
				message: `Server Error: ${err}`,
				title: 'Error',
			});
		}
	}
}

export default new User();

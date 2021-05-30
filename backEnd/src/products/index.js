import express from 'express';
import uniqid from 'uniqid';
import { getProducts, writeProduct } from '../files/index.js';
const productsRouter = express.Router();

productsRouter.get('/', async (req, res, next) => {
	try {
		const products = await getProducts();
		res.send(products);
	} catch (error) {
		next(error);
	}
});
productsRouter.post('/', async (req, res, next) => {
	try {
		const products = await getProducts();
		const newProduct = {
			...req.body,
			_id: uniqid(),
			createdAt: new Date(),
		};
		products.push(newProduct);
		writeProduct(products);
		res.status(201).send(newProduct);
	} catch (error) {
		next(error);
	}
});
productsRouter.get('/:id', async (req, res, next) => {
	try {
		const products = await getProducts();
		const matchedProduct = products.find(
			(product) => product._id === req.params.id
		);
		if (matchedProduct) {
			res.send(matchedProduct);
		} else {
			res.status(404).send('NO EXISTENCE');
		}
	} catch (error) {
		next(error);
	}
});
productsRouter.delete('/:id', async (req, res, next) => {
	try {
		const products = await getProducts();
		const matchedProducts = products.find(
			(product) => product._id === req.params.id
		);
		if (matchedProducts !== undefined) {
			const UnMatchedProducts = products.filter(
				(product) => product._id !== req.params.id
			);
			await writeProduct(UnMatchedProducts);
			res.status(200).send('Product Deleted');
		} else {
			res.status(404).send('Product not found');
		}
	} catch (error) {
		next(error);
	}
});
productsRouter.put('/:id', async (req, res, next) => {
	try {
		const products = await getProducts();
		const matchedProduct = products.find(
			(product) => product._id === req.params.id
		);
		if (matchedProduct !== undefined) {
			const updateProduct = {
				...req.body,
				_id: req.params.id,
				createdAt: new Date(),
			};
			const matchedProductIndex = products.findIndex(
				(product) => product._id === req.params.id
			);
			products[matchedProductIndex] = updateProduct;
			writeProduct(products);
			res.send(updateProduct);
		} else {
			res.send('PRODUCT NOT FOUND');
		}
	} catch (error) {
		next(error);
	}
});
export default productsRouter;

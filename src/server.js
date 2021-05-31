import express from 'express';
import listEndpoints from 'express-list-endpoints';
import cors from 'cors';
import productsRouter from './products/index.js';
const server = express();

const port = process.env.PORT || 3002;
const whitelist = [
	process.env.FRONTEND_DEV_URL,
	process.env.FRONTEND_CLOUD_URL,
];
const corsOptions = {
	origin: function (origin, next) {
		console.log('ORIGIN ', origin);
		if (whitelist.indexOf(origin) !== -1) {
			// origin allowed
			next(null, true);
		} else {
			// origin not allowed
			next(new Error('CORS TROUBLES!!!!!'));
		}
	},
};

server.use(cors(corsOptions));
server.use(express.json());

server.use('/products', productsRouter);
console.table(listEndpoints(server));
server.listen(port, () => {
	console.log('SERVER STARTED', port);
});

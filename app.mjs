import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import mainRouter from './routes/mainRoute.mjs';
import loginRouter from './routes/loginRoute.mjs';
import registerRouter from './routes/registerRoute.mjs';
import userRouter from './routes/userRoute.mjs';
import { setToken, setRole } from './middlewares/tokenMiddleware.mjs';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(setToken, setRole);

app.use(mainRouter);
app.use(loginRouter);
app.use(registerRouter);
app.use(userRouter);

//Connection to db and run server
async function start() {
	try {
		await mongoose.connect(process.env.URL);
		app.listen(PORT, () =>
			console.log(`Server was started on port: ${PORT}`)
		);
	} catch (err) {
		console.log(err);
	}
}

//Error handlers
app.use(function (req, res, next) {
	res.status(404).render('notFoundPage', {
		title: 'Page not found',
		url: req.originalUrl,
	});
});

app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

start();

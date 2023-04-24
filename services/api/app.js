import express from 'express';
import cors from 'cors';
import session from 'express-session';
import SequelizeStore from 'connect-session-sequelize';
import * as dotenv from 'dotenv';
import { apiRouter } from './routes/api.js';
import { db } from './database/sequelize.js';

dotenv.config();
const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

const Store = SequelizeStore(session.Store);

app.use(
	session({
		name: 'session',
		secret: process.env.SESSION_KEY,
		resave: false,
		saveUninitialized: false,
		store: new Store({
			db: db.sequelize,
		}),
		cookie: {
			secure: false,
			maxAge: 600000,
		},
	})
);

app.listen(PORT, async () => {
	try {
		await db.sequelize.sync();
		apiRouter(app);
		console.log('Database sync successful!');
		console.log(`Listening on PORT ${PORT}...`);
	} catch (err) {
		console.log(`Database sync failed: ${err.message}`);
	}
});

import { authRouter } from '../routes/auth.js';

export function apiRouter(app) {
	app.use('/api', authRouter);
}

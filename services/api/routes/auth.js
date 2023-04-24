import express from 'express';
import { authController } from '../controllers/auth.js';

const router = express.Router();
const { registerUser, loginUser } = authController;

router.post('/register', async function (req, res, next) {
	try {
		const { user, err } = await registerUser(req.body);
		if (user) {
			req.session.user = user;
			res.status(200).send({ user });
		}
		if (err) res.status(err.code).json({ err });
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post('/login', async function (req, res, next) {
	try {
		const { user, err } = await loginUser(req.body);
		if (user) {
			req.session.user = user;
			res.status(200).send({ user });
		}
		if (err) res.status(err.code).json({ err });
	} catch (err) {
		console.log(err);
		res.status(500).json(err);
	}
});

router.post('/session', async function (req, res, next) {
	const user = req.session.user;
	if (user) {
		res.status(200).json({ user });
	} else {
		res.status(200).json({ err: 'Not authenticated.' });
	}
});

router.delete('/logout', async function (req, res, next) {
	if (!req.session) res.end();
	req.session.destroy(err => {
		if (err) res.status(400).send('Logout unsuccessful.');
		res.send('Logout successful.');
	});
});

export { router as authRouter };

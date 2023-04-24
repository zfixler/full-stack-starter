import { useState } from 'react';
import { Link } from 'react-router-dom';
import { handleChange } from '../helpers/forms';
import { useAuth } from '../context/Auth';

function login() {
	const initialLoginData = {
		email: '',
		password: '',
	};

	const [loginData, setLoginData] = useState(initialLoginData);
	const [responseError, setResponseError] = useState('');
	const { loginUser } = useAuth();

	async function handleSubmit(e) {
		e.preventDefault();

		const response = await fetch('/api/login', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST', 
			body: JSON.stringify(loginData),
		});

		const { user, err } = await response.json();

		if (user) {
			setResponseError('');
			setLoginData(initialLoginData);
			loginUser(user);
		};

		if (err) setResponseError(err.message);

		setLoginData({ ...loginData, password: '' });
	}

	return (
		<div className='loginContainer'>
			<form
				className='loginForm'
				onSubmit={handleSubmit}>
				<h2 className='loginFormTitle'>Login</h2>
				<small className="loginFormError">{responseError}</small>
				<label
					htmlFor='email'
					className='loginFormLabel'>
					Email
					<div className='loginFormInputContainer'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='loginFormInputIcon'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
							/>
						</svg>
						<input
							className='loginInputEmail'
							type='email'
							name='email'
							value={loginData.email}
							onChange={(e) => handleChange(e, setLoginData)}
						/>
					</div>
				</label>
				<label
					htmlFor='password'
					className='loginFormLabel'>
					Password
					<div className='loginFormInputContainer'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='loginFormInputIcon'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
							/>
						</svg>
						<input
							className='loginInputPassword'
							type='password'
							name='password'
							value={loginData.password}
							onChange={(e) => handleChange(e, setLoginData)}
						/>
					</div>
				</label>
				<div className='loginFormSubmitContainer'>
					<Link
						className='loginFormSubmitLink'
						to='../registration'>
						Need an account? Register.
					</Link>
					<button className='loginBtnSubmit'>Login</button>
				</div>
			</form>
		</div>
	);
}

export default login;

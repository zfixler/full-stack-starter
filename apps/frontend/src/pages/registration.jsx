import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { handleChange } from '../helpers/forms';
import { useAuth } from '../context/Auth';

function registration() {
	const initialRegistrationData = {
		firstName: '',
		lastName: '',
		email: '',
		confirmEmail: '',
		password: '',
		confirmPassword: '',
	};

	const [registrationData, setRegistrationData] = useState(
		initialRegistrationData
	);
	const [errorMessages, setErrorMessages] = useState(initialRegistrationData);
	const [shouldSubmit, setShouldSubmit] = useState(false);
	const [responseError, setResponseError] = useState('');
	const { loginUser } = useAuth();

	useEffect(() => {
		const hasErrorMessages = Object.values(errorMessages).reduce(
			(memo, value) => {
				if (!!value) memo = true;
				return memo;
			},
			false
		);

		const hasRegistrationData = Object.values(registrationData).reduce(
			(memo, value) => {
				if (!!value) memo = true;
				return memo;
			},
			false
		);

		setShouldSubmit(hasRegistrationData && !hasErrorMessages);
	}, [registrationData, errorMessages]);

	function setError(name, message) {
		setErrorMessages((prevState) => {
			return {
				...prevState,
				[name]: message,
			};
		});
	}

	function validateField(e) {
		const { name, value } = e.target;
		const isName = name === 'firstName' || name === 'lastName';
		if (isName && value.length < 3) {
			return setError(name, 'Please enter at least three characters.');
		}

		const isConfirmEmail = name === 'confirmEmail';
		if (isConfirmEmail && value !== registrationData.email) {
			return setError(name, 'Email addresses must match.');
		}

		const isConfirmPassword = name === 'confirmPassword';
		if (isConfirmPassword && value !== registrationData.password) {
			return setError(name, 'Passwords must match.');
		}

		setErrorMessages(initialRegistrationData);
	}

	

	async function handleSubmit(e) {
		e.preventDefault();

		const { firstName, lastName, email, password } = registrationData;

		const response = await fetch('/api/register', {
			method: 'POST', 
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ firstName, lastName, email, password }),
		});

		const { user, err } = await response.json();

		if ( user) {
			loginUser(user);
			setResponseError('');
			setRegistrationData(initialRegistrationData);
		};
		
		if ( err) setResponseError(err.message);

	}

	return (
		<div className='registrationContainer'>
			<form
				className='registrationForm'
				onSubmit={handleSubmit}>
				<h2 className='registrationFormTitle'>Registration</h2>
				<small className="registrationFormError">{responseError}</small>
				<label
					htmlFor='firstName'
					className={
						errorMessages.firstName
							? 'registrationFormLabelError'
							: 'registrationFormLabel'
					}>
					First Name
					<div
						className={
							errorMessages.firstName
								? 'registrationFormInputContainerError'
								: 'registrationFormInputContainer'
						}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='registrationFormInputIcon'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
							/>
						</svg>
						<input
							className='registrationInputEmail'
							type='text'
							name='firstName'
							value={registrationData.firstName}
							onChange={(e) => {
								handleChange(e, setRegistrationData);
								validateField(e);
							}}
						/>
					</div>
					<small className='registrationFormError'>
						{errorMessages.firstName}
					</small>
				</label>
				<label
					htmlFor='lastName'
					className={
						errorMessages.lastName
							? 'registrationFormLabelError'
							: 'registrationFormLabel'
					}>
					Last Name
					<div
						className={
							errorMessages.lastName
								? 'registrationFormInputContainerError'
								: 'registrationFormInputContainer'
						}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='registrationFormInputIcon'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
							/>
						</svg>
						<input
							className='registrationInputEmail'
							type='text'
							name='lastName'
							value={registrationData.lastName}
							onChange={(e) => {
								handleChange(e, setRegistrationData);
								validateField(e);
							}}
						/>
					</div>
					<small className='registrationFormError'>
						{errorMessages.lastName}
					</small>
				</label>
				<label
					htmlFor='email'
					className='registrationFormLabel'>
					Email
					<div className='registrationFormInputContainer'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='registrationFormInputIcon'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
							/>
						</svg>
						<input
							className='registrationInputEmail'
							type='email'
							name='email'
							value={registrationData.email}
							onChange={(e) => handleChange(e, setRegistrationData)}
						/>
					</div>
				</label>
				<label
					htmlFor='confirmEmail'
					className={
						errorMessages.confirmEmail
							? 'registrationFormLabelError'
							: 'registrationFormLabel'
					}>
					Confirm Email
					<div
						className={
							errorMessages.confirmEmail
								? 'registrationFormInputContainerError'
								: 'registrationFormInputContainer'
						}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='registrationFormInputIcon'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75'
							/>
						</svg>
						<input
							className='registrationInputEmail'
							type='email'
							name='confirmEmail'
							value={registrationData.confirmEmail}
							onChange={(e) => {
								handleChange(e, setRegistrationData);
								validateField(e);
							}}
						/>
					</div>
					<small className='registrationFormError'>
						{errorMessages.confirmEmail}
					</small>
				</label>
				<label
					htmlFor='password'
					className='registrationFormLabel'>
					Password
					<div className='registrationFormInputContainer'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='registrationFormInputIcon'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
							/>
						</svg>
						<input
							className='registrationInputPassword'
							type='password'
							name='password'
							value={registrationData.password}
							onChange={(e) => handleChange(e, setRegistrationData)}
						/>
					</div>
				</label>
				<label
					htmlFor='confirmPassword'
					className={
						errorMessages.confirmPassword
							? 'registrationFormLabelError'
							: 'registrationFormLabel'
					}>
					Confirm Password
					<div
						className={
							errorMessages.confirmPassword
								? 'registrationFormInputContainerError'
								: 'registrationFormInputContainer'
						}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='registrationFormInputIcon'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
							/>
						</svg>
						<input
							className='registrationInputPassword'
							type='password'
							name='confirmPassword'
							value={registrationData.confirmPassword}
							onChange={(e) => {
								handleChange(e, setRegistrationData);
								validateField(e);
							}}
						/>
					</div>
					<small className='registrationFormError'>
						{errorMessages.confirmPassword}
					</small>
				</label>
				<div className='registrationFormSubmitContainer'>
					<Link
						className='registrationFormSubmitLink'
						to='../'>
						Have an account? Login.
					</Link>
					<button
						className='registrationBtnSubmit'
						disabled={!shouldSubmit}>
						Register Account
					</button>
				</div>
			</form>
		</div>
	);
}

export default registration;

import axios from 'axios';
import React, { useState } from 'react';
import cookie from 'js-cookie';
// import './Login.scss';
import Auth from '../Auth/Auth';
import { Redirect } from 'react-router-dom';
import { motion } from 'framer-motion';
const Login = () => {
	const [email, setemail] = useState('');
	const [password, setpassword] = useState('');
	const [data, setdata] = useState([]);
	const [Emailerror, setEmailerror] = useState('');
	const [Passworderror, setPassworderror] = useState('');
	const [redirect, setredirect] = useState(false);
	const [ShowAlert, setShowAlert] = useState(false);
	const handleLogin = () => {
		if (redirect) {
			return <Redirect to='/home' />;
		}
		setEmailerror('');
		setPassworderror('');
		axios
			.post(
				process.env.REACT_APP_BASE_URL + 'login',
				{
					email: email,
					password: password,
				},
				{
					headers: {
						'content-type': 'application/json',
					},
				}
			)
			.then((res) => {
				console.log(res);
				cookie.set('jwt', res.data.token);
				cookie.set('userId', res.data.user.userId, {
					expires: 1,
				});
				Auth.authenticate();
				setShowAlert(true);
			})
			.catch((error) => {
				console.log(error.response.data);
				// console.log(error.response.status);
				// console.log(error.response.headers);
				if (error.response.data.Error.includes('User'))
					setEmailerror(error.response.data.Error);
				else {
					setPassworderror(error.response.data.Error);
				}
			});
	};
	return (
		<div className='flex md:grid md:grid-cols-2 ' style={{ height: '45rem' }}>
			<div className='text-black hidden  md:flex justify-end items-center '>
				<img
					src='https://image.freepik.com/free-vector/online-registration-sign-up-concept-with-man-character_268404-98.jpg'
					alt=''
					className=''
				/>
			</div>
			<div className=' col-span-2 md:col-span-1 w-full max-w-md my-auto  rounded-lg border border-primaryBorder shadow-default py-10 px-16 shadow-md'>
				<h1 className='text-2xl font-medium text-primary mt-12 mb-12 text-center'>
					Log in to your account
				</h1>

				<div>
					<label htmlFor='email'>Email</label>
					<input
						type='email'
						className={`w-full p-3 sm:p-2 text-primary border rounded-md outline-none text-base  transition duration-150 ease-in-out mb-2`}
						id='email'
						value={email}
						onChange={(e) => setemail(e.target.value)}
						placeholder='Your Email'
					/>
				</div>
				<p className='text-red text-sm'>{Emailerror}</p>
				<div>
					<label htmlFor='password'>Password</label>
					<input
						type='password'
						className={`w-full p-3 sm:p-2 text-primary border rounded-md outline-none text-base   transition duration-150 ease-in-out mb-4`}
						id='password'
						value={password}
						onChange={(e) => setpassword(e.target.value)}
						placeholder='Your Password'
					/>
				</div>
				<p className='text-red text-sm'>{Passworderror}</p>

				<div className='flex justify-center items-center mt-6 mb-12'>
					<button
						className={`bg-green py-2 px-8 sm:px-4 text-base  text-white rounded border border-green focus:outline-none focus:border-green-dark`}
						onClick={handleLogin}>
						Login
					</button>
				</div>
				{ShowAlert ? (
					<motion.div
						initial={{ x: '100vw' }}
						animate={{ x: 0 }}
						exit={{ opacity: 0, transition: 'all 0.5s ease-out' }}
						transition={{ duration: 1 }}
						className='absolute right-3 bottom-6 md:bottom-20 w-3/4 sm:w-1/4 p-2 py-1 bg-green items-center text-indigo-100 leading-none rounded-md flex lg:inline-flex'
						role='alert'>
						<span className='flex rounded-full bg-green uppercase px-2 py-1 text-sm font-bold mr-3'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
								/>
							</svg>
						</span>
						<span className=' text-sm font-semibold mr-2 text-center flex-auto'>
							Log in Successfull !
						</span>
						<svg
							onClick={() => setShowAlert(false)}
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6 cursor-pointer'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M6 18L18 6M6 6l12 12'
							/>
						</svg>
					</motion.div>
				) : null}
			</div>
		</div>
	);
};

export default Login;

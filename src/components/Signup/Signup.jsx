import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Signup.scss';
const Signup = () => {
	const [email, setemail] = useState('');
	const [password, setpassword] = useState('');
	const [data, setdata] = useState([]);
	const [error, seterror] = useState('');
	useEffect(() => {
		console.log(process.env);
	}, []);
	const handleSignup = () => {
		axios
			.post(
				process.env.REACT_APP_BASE_URL + 'signup',
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
			})
			.catch((error) => {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
				seterror(error.response.data.Error);
			});
	};
	return (
		<div
			className='text-black border w-screen flex justify-center items-center flex-col'
			style={{ height: '40rem' }}>
			<h1 className='text-3xl font-bold pb-3'>Sign Up </h1>

			<div className='flex flex-col py-4'>
				<label htmlFor='' className='text-lg font-semibold pb-3'>
					Username:
				</label>
				<input
					type='text'
					className='border-b-2 border-black focus:border-primary w-80 py-3 focus:outline-none '
					value={email}
					onChange={(e) => setemail(e.target.value)}
				/>
			</div>
			<div className='flex flex-col pt-4'>
				<label htmlFor='' className='text-lg font-semibold pb-3'>
					Password:
				</label>
				<input
					type='text'
					className='border-b-2 border-black focus:border-primary w-80 py-3 focus:outline-none '
					value={password}
					onChange={(e) => setpassword(e.target.value)}
				/>
			</div>
			<div className='py-8'>
				{error && <p className='text-red  pb-4'>{error}</p>}
				<button
					className='w-80 text-white  py-3 bg-primary'
					onClick={handleSignup}>
					Create account
				</button>
			</div>
		</div>
	);
};

export default Signup;

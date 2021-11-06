import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Auth from '../Auth/Auth';
const ToRedirect = () => {
	useEffect(() => {
		if (Auth.isAuthenticated) {
			Redirect('/');
		}
	}, []);
	return (
		<div className='flex justify-center items-center text-8xl text-white h-96'>
			Redirecting...
		</div>
	);
};

export default ToRedirect;

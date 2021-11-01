import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const ToRedirect = () => {
	useEffect(() => {
        console.log('Use Effect');
		Redirect('/home');
	}, []);
	return (
		<div className='flex justify-center items-center text-8xl text-white h-96'>
			Redirecting...
		</div>
	);
};

export default ToRedirect;

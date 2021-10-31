import React from 'react';
import Auth from '../Auth/Auth';
const Login = () => {
	return (
		<>
			<div
				className=''
				onClick={() => {
					Auth.authenticate();
				}}>
				Login
			</div>
			<div
				className=''
				onClick={() => {
					Auth.signout();
				}}>Sign Out</div>
		</>
	);
};

export default Login;

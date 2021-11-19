import React from 'react';
import { Link } from 'react-router-dom';
import './About.scss';
const About = () => {
	return (
		<div
			className='text-black flex justify-center text-xl items-center flex-col px-10'
			style={{ height: '89vh' }}>
			<p> 💫If you Liked my work, feel free to give me a  ⭐ 💫</p>
			<a
				href='https://github.com/CoderNehal/personal-finance-app'
				className='text-red  pb-1 border-red border-b-2'
				target='_blank'>
				here
			</a>
		</div>
	);
};

export default About;

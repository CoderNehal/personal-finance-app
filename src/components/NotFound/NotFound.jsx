import React from 'react';
import './index.scss';
import { useHistory } from 'react-router-dom';
const NotFound = () => {
	const history = useHistory();
	return (
		<main className='container'>
			{[...Array(22).keys()].map((ele) => {
				return <span className='particle'>0</span>;
			})}
			{[...Array(22).keys()].map((ele) => {
				return <span className='particle'>4</span>;
			})}
			<article className='content'>
				<p className='p'>Damnit stranger,</p>
				<p className='p'>
					You got lost in the <strong>404</strong> galaxy.
				</p>
				<p className='p'>
					<button className='button' onClick={() => history.replace('/home')}>
						Go back to earth.
					</button>
				</p>
			</article>
		</main>
	);
};

export default NotFound;

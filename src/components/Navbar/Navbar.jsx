import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Auth from '../Auth/Auth';
import './Navbar.scss';

const Navbar = () => {
	const [Logged, setLogged] = useState(localStorage.getItem('isLogged'));
	const Location = useLocation();
	useEffect(() => {
		console.log(Logged);
		setLogged(localStorage.getItem('isLogged'));
		console.log('Navbar rendered');
	}, [Location]);
	return (
		<nav className='nav w-screen bg-secondary flex flex-wrap items-center justify-between px-6 md:px-16 py-4 border-b-2 border-gray-400  shadow-md'>
			<div className='flex flex-no-shrink items-center mr-6 py-3 text-grey-darkest'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className=' w-7 h-7 mr-3'
					viewBox='0 0 20 20'
					fill='currentColor'>
					<path d='M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z' />
					<path
						fillRule='evenodd'
						d='M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z'
						clipRule='evenodd'
					/>
				</svg>
				<span className='font-semibold text-xl tracking-tight'>EveryRupee</span>
			</div>

			<input class='menu-btn hidden' type='checkbox' id='menu-btn' />
			<label
				class='menu-icon  block cursor-pointer md:hidden px-2 py-4 relative select-none'
				htmlFor='menu-btn'>
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
						d='M4 6h16M4 12h16M4 18h16'
					/>
				</svg>
			</label>

			<ul className='menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto'>
				<li className='border-t md:border-none'>
					<NavLink
						to='/home'
						className='block md:inline-block px-4 py-3   text-grey-darkest hover:text-grey-darker'>
						Home
					</NavLink>
				</li>

				<li className='border-t md:border-none'>
					<NavLink
						to='/about'
						className='block md:inline-block px-4 py-3 text-grey-darkest hover:text-grey-darker'>
						About
					</NavLink>
				</li>

				{Logged == 'true' ? (
					<li className='border-t md:border-none'>
						<button
							className='block md:inline-block  md:px-7 ml-3 md:ml-5 py-1 my-2 md:mt-2  text-red hover:text-grey-darker border-gray-400 md:border md:text-center rounded-sm'
							onClick={() => {
								setLogged(false);
								window.location.reload(true);
								Auth.signout();
							}}
							style={{ color: 'red' }}>
							Logout
						</button>
					</li>
				) : (
					<>
						<li className='border-t md:border-none'>
							<NavLink
								to='/login'
								className='block md:inline-block px-4 py-3 text-grey-darkest hover:text-grey-darker'>
								Log In
							</NavLink>
						</li>

						<li className='border-t md:border-none'>
							<NavLink
								to='/signup'
								className='block md:inline-block px-4 py-3 text-grey-darkest hover:text-grey-darker'>
								Sign Up
							</NavLink>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;

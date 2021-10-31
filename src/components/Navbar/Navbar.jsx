import React from 'react';
import './Navbar.scss';
const Navbar = () => {
	return (
		<nav className='nav flex flex-wrap items-center justify-between px-16 py-4'>
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
				<span className='font-semibold text-xl tracking-tight'>
				EveryRupee  
				</span>
			</div>

			<input className='menu-btn hidden' type='checkbox' id='menu-btn' />
			<label
				className='menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none'
				for='menu-btn'>
				<span className='navicon bg-grey-darkest flex items-center relative'></span>
			</label>

			<ul className='menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto'>
				<li className='border-t md:border-none'>
					<a
						href='/'
						className='block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker '>
						Home
					</a>
				</li>

				<li className='border-t md:border-none'>
					<a
						href='/about/'
						className='block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker'>
						About
					</a>
				</li>

				<li className='border-t md:border-none'>
					<a
						href='/login/'
						className='block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker'>
						Log In
					</a>
				</li>

                <li className='border-t md:border-none'>
					<a
						href='/signup/'
						className='block md:inline-block px-4 py-3 no-underline text-grey-darkest hover:text-grey-darker'>
						Sign Up
					</a>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;

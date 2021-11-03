import React, { useState } from 'react';
import './Home.scss';
import { Link } from 'react-router-dom';
const Home = () => {
	const [Balance, setBalance] = useState(34680);
	const [SpentLastMonth, setSpentLastMonth] = useState(123443);
	const [SpentLastYear, setSpentLastYear] = useState(12354443);
	return (
		<div className=' w-screen h-auto cursor-default  relative'>
			<div className='currentAmountBox mt-6 md:mt-16 rounded-md mx-auto w-11/12 border flex flex-col justify-between items-center font-semibold  bg-white py-3 border-gray-500  '>
				<div className='BlankDiv'></div>
				<div>
					<div className='amount text-4xl  border-b-2  md:text-8xl  text-green px-5 md:px-16'>
						₹ {Balance.toLocaleString()}
					</div>
					<p className='text-lg text-center  text-green pt-3'>Total Balance</p>
				</div>
				<div className='flex justify-between w-full md:w-3/4'>
					<div className='lastMonth text-primary text-md md:text-xl  text-center p-4'>
						<p className='border-b-2 mb-2 px-1 md:px-8'>
							Total Spent Last Month
						</p>
						₹ {SpentLastMonth.toLocaleString()}
					</div>
					<div className='totalThisYear text-md md:text-xl   text-center p-4 '>
						<p className='border-b-2 mb-2 px-1 md:px-8'>
							Total Spent This Year
						</p>
						₹ {SpentLastYear.toLocaleString()}
					</div>
				</div>
			</div>

			<div className='buttons flex flex-col px-12 lg:px-0 lg:flex-row justify-between items-center w-11/12 mx-auto mt-4 text-white h-52  '>
				{/* <button className='rounded text-lg btn-border-1 px-36 py-0 xl:py-4 mt-4 xl:mt-0   transition duration-200 ease-in bg-green'>
					Add money
				</button>
				<button className='rounded text-lg btn-border-1 px-36 py-0 xl:py-4 mt-4 xl:mt-0   transition duration-200 ease-in bg-red'>
					Spent Money
				</button>
				<button className='rounded text-lg btn-border-1 px-36 py-0 xl:py-4 mt-4 xl:mt-0 transition duration-200 ease-in bg-yellow-300'>
					View History
				</button> */}
				<Link
					class='btn btn-border-1 border-none outline-none px-36 py-0 xl:py-4 mt-4 xl:mt-0 rounded border-gray-300 text-lg text-center relative flex justify-center items-center text-white bg-green '
					to='/add-money'>
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
							d='M12 4v16m8-8H4'
						/>
					</svg>
					<span className='ml-6 md:ml-3'>Add Money</span>
				</Link>
				<Link
					class='btn btn-border-1  px-36 py-0 xl:py-4 mt-4 xl:mt-0 rounded border-gray-300 text-lg text-center relative flex justify-center items-center text-white bg-red'
					to='/spend-money'>
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
							d='M6 18L18 6M6 6l12 12'
						/>
					</svg>

					<span className='ml-6 md:ml-3'>Spend Money</span>
				</Link>
				<Link
					class='btn btn-border-1  px-36 py-0 xl:py-4 mt-4 xl:mt-0 rounded border-gray-300 text-lg text-center relative flex justify-center items-center text-white bg-yellow-300'
					to='/view-history'>
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
							d='M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z'
						/>
					</svg>

					<span className='ml-6 md:ml-3'>View History</span>
				</Link>
			</div>
			<div className='rounded-full text-white text-center w-8 absolute right-8 md:right-16 mt-12	 md:mt-0'>
				<div class='help-tip'>
					<p>
						This is Fookin tip, Customize it later
						<br />
					</p>
				</div>
			</div>
		</div>
	);
};

export default Home;

import React from 'react';
import './Home.scss';

const Home = () => {
	return (
		<div className=' w-screen h-auto cursor-default  '>
			<div className='currentAmountBox mt-16 rounded-md mx-auto w-11/12 border flex flex-col justify-between items-center font-semibold  bg-white py-3 border-gray-500  '>
				<div className='BlankDiv'></div>
				<div>
					<div className='amount text-4xl  border-b-2  md:text-8xl  text-green px-5 md:px-16'>
						₹ 122121
					</div>
					<p className='text-lg text-center  text-green pt-3'>Total Balance</p>
				</div>
				<div className='flex justify-between w-full md:w-3/4'>
					<div className='lastMonth text-primary text-md md:text-xl  text-center p-4'>
						<p className='border-b-2 mb-2 px-1 md:px-8'>
							Total Spent Last Month
						</p>
						₹ 12921
					</div>
					<div className='totalThisYear text-md md:text-xl   text-center p-4 '>
						<p className='border-b-2 mb-2 px-1 md:px-8'>
							Total Spent This Year
						</p>
						₹ 346282
					</div>
				</div>
			</div>

			<div className='buttons flex justify-between items-center w-11/12 mx-auto mt-4 text-white h-52 '>
				<button className='rounded text-lg px-36 py-4 border border-opacity-0 hover:bg-secondary hover:text-green hover:border-opacity-100 transition duration-200 ease-in bg-green'>
					Add money
				</button>
				<button className='rounded text-lg px-36 py-4 border border-opacity-0 hover:bg-secondary hover:text-red hover:border-opacity-100 transition duration-200 ease-in bg-red'>
					Spent Money
				</button>
				<button className='rounded text-lg px-36 py-4 border border-opacity-0 hover:bg-secondary hover:text-yellow-300 hover:border-opacity-100 transition duration-200 ease-in bg-yellow-300'>
					View History
				</button>
			</div>
		</div>
	);
};

export default Home;

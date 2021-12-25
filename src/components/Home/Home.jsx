import React, { useEffect, useState } from 'react';
import './Home.scss';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import cookie from 'js-cookie';
import Loading from '../Loading';
import date from 'date-and-time';
const Home = () => {
	const [Balance, setBalance] = useState(0);
	const [SpentLastMonth, setSpentLastMonth] = useState(0);
	const [SpentLastYear, setSpentLastYear] = useState(0);
	const [isLoading, setisLoading] = useState(false);
	useEffect(() => {
		setisLoading(true);

		axios
			.post(
				process.env.REACT_APP_BASE_URL + 'get-user',
				{
					userId: cookie.get('userId'),
				},
				{
					headers: {
						'content-type': 'application/json',
					},
				}
			)
			.then((res) => {
				const { Balance, LastMonthSpent, LastYearSpent } = res.data.userInfo;
				setBalance(Balance);
				setSpentLastMonth(LastMonthSpent);
				setSpentLastYear(LastYearSpent);
				setisLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div className='HomeContainer w-screen   cursor-default  relative pt-16 '>
					{
						<motion.div
							initial={{ width: 0 }}
							animate={{ width: '91.666667%' }}
							transition={{ duration: 0.5 }}
							className='currentAmountBox  rounded-md mx-auto w-11/12 border flex flex-col justify-between items-center font-semibold  bg-white dark:bg-darkModeBlack py-3 border-gray-500  '>
							<div className='BlankDiv'></div>
							<motion.div
								initial={{ y: -30, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ duration: 0.7, delay: 0.3 }}>
								<div className='amount text-4xl  overflow-hidden   md:text-8xl  text-green px-5 md:px-16'>
									₹ {Balance.toLocaleString()}
								</div>
								<motion.hr
									initial={{ width: 0 }}
									animate={{ width: '100%' }}
									transition={{ duration: 0.5, delay: 0.7 }}
									style={{ height: '1.5px', background: '#eeeeee' }}
								/>
								<p className='text-lg sm:text-xl text-center  text-green pt-3'>
									Total Balance
								</p>
							</motion.div>
							<div className='flex justify-between w-full md:w-3/4'>
								<motion.div
									initial={{ y: 30, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.7, delay: 1.3 }}
									className='lastMonth text-primary dark:text-darkModePrimary text-md md:text-xl text-center p-4'>
									<p className='  px-1 md:px-8'>Total Spent Last Month</p>
									<motion.hr
										className='mb-2'
										initial={{ width: 0 }}
										animate={{ width: '100%' }}
										transition={{ duration: 0.3, delay: 2 }}
										style={{
											height: '1.5px',
											background: '#eeeeee',
										}}
									/>
									₹{SpentLastMonth.toLocaleString()}
								</motion.div>

								<motion.div
									initial={{ y: 30, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ duration: 0.7, delay: 1.3 }}
									className='totalThisYear text-md md:text-xl text-center p-4 '>
									<p className=' px-1 md:px-8'>Total Spent This Year</p>
									<motion.hr
										className='mb-2'
										initial={{ width: 0 }}
										animate={{ width: '100%' }}
										transition={{ duration: 0.3, delay: 2 }}
										style={{
											height: '1.5px',
											background: '#eeeeee',
										}}
									/>
									₹{SpentLastYear.toLocaleString()}
								</motion.div>
							</div>
						</motion.div>
					}

					<div className='buttons flex flex-col md:px-12 lg:px-0 lg:flex-row justify-between items-center  w-11/12 mx-auto mt-4 text-white h-full md:h-52  '>
						<motion.div
							initial={{ x: '-100vw' }}
							animate={{ x: 0 }}
							transition={{
								duration: 0.7,
							}}>
							<Link
								className='btn bg-green  flex justify-content-center items-center min-w-full px-cs  md:px-36 py-3 md:py-4  lg:text-xl  rounded-sm md:rounded   sm:w-auto mx-auto border-gray-300  whitespace-nowrap dark:text-darkModeText'
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
								<span className='ml-6 md:ml-3 '>Add Money</span>
							</Link>
						</motion.div>
						<motion.div
							initial={{ x: '-100vw' }}
							animate={{ x: 0 }}
							transition={{
								duration: 1,
							}}>
							<Link
								className='btn bg-red flex justify-content-center items-center mt-4 md:mt-0 px-20 md:px-36 py-3 md:py-4  lg:text-xl rounded-sm md:rounded sm:w-auto mx-auto border-gray-300 whitespace-nowrap dark:text-darkModeText'
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
						</motion.div>
						<motion.div
							initial={{ x: '-100vw' }}
							animate={{ x: 0 }}
							transition={{
								duration: 1.3,
							}}>
							<Link
								className='btn dark:bg-secondary bg-yellow-300 flex justify-content-center items-center mt-4 md:mt-0 px-cs md:px-36 py-3 md:py-4  lg:text-xl  rounded-sm md:rounded   sm:w-auto mx-auto border-gray-300 whitespace-nowrap dark:text-darkModeText'
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
						</motion.div>
					</div>
					<div className='rounded-full text-white text-center w-8 absolute right-8 md:right-16 mt-12	 md:mt-0'>
						<div className='help-tip'>
							<p>
								This is Fookin tip, Customize it later
								<br />
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Home;

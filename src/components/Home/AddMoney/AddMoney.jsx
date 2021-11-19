import React, { useEffect, useState } from 'react';
import './AddMoney.scss';
import Cash from '../../../images/cash.png';
import PassiveIncome from '../../../images/PassiveIncome.png';
import Other from '../../../images/Other.png';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import AnimatedNumber from 'animated-number-react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import cookie from 'js-cookie';
import Loading from '../../Loading';
import date from 'date-and-time';
const container = {
	hidden: { opacity: 1, scale: 0 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
};

const item = {
	hidden: { y: 20, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
	},
};
const AddMoney = () => {
	const [CurrentBalance, setCurrentBalance] = useState(0); //Fetch here
	const [UpdatedBalance, setUpdatedBalance] = useState(0);
	const [AmoutToAdd, setAmoutToAdd] = useState();
	const [ModeOFIncome, setModeOFIncome] = useState(null);
	const [ShowAlert, setShowAlert] = useState(false);
	const [unMount, setunMount] = useState(false);
	const [todaysDate, settodaysDate] = useState('');
	const [userId, setUserId] = useState(cookie.get('userId'));
	const [isLoading, setisLoading] = useState(false);
	const history = useHistory();
	const { ref, inView } = useInView({
		threshold: 1,
	});
	const animation = useAnimation();
	useEffect(() => {
		if (inView) {
			animation.start({ rotate: 0, scale: 1 });
		}
	}, [inView]);
	useEffect(() => {
		setisLoading(true);
		const now = new Date();
		settodaysDate(date.format(now, 'ddd, MMM DD YYYY hh:mm:A'));

		axios
			.post(
				process.env.REACT_APP_BASE_URL + 'get-user',
				{
					userId: userId,
				},
				{
					headers: {
						'content-type': 'application/json',
					},
				}
			)
			.then((res) => {
				console.log(res);
				const { Balance } = res.data.userInfo;
				setisLoading(false);
				setCurrentBalance(Balance);
				setUpdatedBalance(Balance);
			})
			.catch((err) => {
				console.log(err);
				setisLoading(false);
			});
	}, []);
	const handleIncomeSource = (classList, id) => {
		document.getElementById('Salary').classList.remove('border-primary');
		document.getElementById('Passive').classList.remove('border-primary');
		document.getElementById('Other').classList.remove('border-primary');
		classList.add('border-primary');
		console.log(id);
		setModeOFIncome(id);
	};
	const formatValue = (value) => `₹ ${Number(value).toLocaleString()}`;
	const HandleAddMoney = async () => {
		setShowAlert(false);
		if (AmoutToAdd === 0) {
			alert('Please Enter a Valid Amount');
		} else if (ModeOFIncome === null) {
			alert('Please select Mode of Income');
		} else {
			const updatedAmmount = CurrentBalance + AmoutToAdd;
			setUpdatedBalance(updatedAmmount); // async

			axios
				.post(
					process.env.REACT_APP_BASE_URL + 'add-money',
					{
						money: AmoutToAdd,
						resaon: ModeOFIncome,
						userId: userId,
						date: todaysDate,
					},
					{
						headers: {
							'content-type': 'application/json',
						},
					}
				)
				.then((res) => {
					console.log(res.data);
					setShowAlert(true);
				})
				.catch((err) => {
					console.log(err);
				});
			console.log(
				'Balance:',
				CurrentBalance,
				'Update:',
				UpdatedBalance,
				'Total amount Added:',
				AmoutToAdd,
				'Mode of payment:',
				ModeOFIncome
			);
		}
	};
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div className='AddMoneyContainer p-8  relative'>
					<button
						className=' absolute text-black  cursor-pointer w-12 h-12 '
						onClick={() => {
							setunMount(true);
							setTimeout(() => {
								history.goBack();
							}, 1000);
						}}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6 md:h-8 md:w-8 '
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M10 19l-7-7m0 0l7-7m-7 7h18'
							/>
						</svg>
					</button>
					<div className='flex flex-col md:flex-row justify-between h-full items-center '>
						<div className=' w-1/2 h-full flex flex-col '>
							<AnimatePresence>
								{!unMount && (
									<>
										<motion.div
											initial={{ opacity: 0, x: -50 }}
											transition={{ duration: 1 }}
											animate={{ opacity: 0.7, x: 0 }}
											exit={{ opacity: 0 }}
											className='currentBalance h-1/2 text-3xl md:text-6xl flex flex-col justify-center items-center text-black whitespace-nowrap'>
											₹ {CurrentBalance.toLocaleString()}
											<p className='text-base md:text-lg pb-4 md:pt-4 md:pb-0 text-center'>
												Current Balance
											</p>
										</motion.div>
										<motion.div
											initial={{ opacity: 0, x: 50 }}
											transition={{ duration: 1 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0 }}
											className='updatedBalance h-1/2 text-3xl md:text-6xl flex flex-col justify-center items-center text-green whitespace-nowrap '>
											<AnimatedNumber
												value={UpdatedBalance}
												formatValue={formatValue}
												duration={250}
											/>
											<p className='text-base md:text-lg pb-4 md:pt-4 md:pb-0 text-center'>
												After Adding
											</p>
										</motion.div>
									</>
								)}
							</AnimatePresence>
						</div>
						<div className=' w-full md:w-1/2 px-0 py-3 md:px-16 h-full  '>
							<div className=' bg-image border h-full lg:w-11/12  flex flex-col text-black rounded-md '>
								<div className='upperPart h-1/2 flex flex-col justify-between items-center py-5'>
									<div className='text-green text-center text-lg lg:text-xl'>
										How much would you like to add?
									</div>
									<div className='-ml-4 py-6 lg:py-0'>
										<div className='flex justify-center items-center text-primary text-xl'>
											₹
											<input
												className={`bg-transparent border-b-2 w-1/3 text-center ml-4 ${
													AmoutToAdd > 0 ? 'border-green' : null
												}`}
												type='number'
												value={AmoutToAdd}
												onChange={(e) => setAmoutToAdd(Number(e.target.value))}
											/>
										</div>
									</div>
									<motion.div
										variants={container}
										initial='hidden'
										animate='visible'
										className='MoneyOptions grid grid-cols-2 gap-3  sm:flex sm:justify-between sm:items-center sm:w-3/4 h-auto lg:h-1/2 flex-wrap px-0 md:px-10'>
										<motion.div
											variants={item}
											className='py-1 px-3 cursor-pointer rounded-md my-auto text-center border-2 text-lg  border-green  text-primary hover:bg-green hover:text-white transition-all duration-400 ease-in-out'
											onClick={(e) => {
												setAmoutToAdd(100);
											}}>
											₹ 100
										</motion.div>
										<motion.div
											variants={item}
											className='py-1 px-3 cursor-pointer rounded-md my-auto text-center border-2 text-lg  border-green  text-primary hover:bg-green hover:text-white transition-all duration-400 ease-in-out'
											onClick={(e) => {
												setAmoutToAdd(200);
											}}>
											₹ 200
										</motion.div>
										<motion.div
											variants={item}
											className='py-1 px-3 cursor-pointer rounded-md my-auto text-center border-2 text-lg  border-green  text-primary hover:bg-green hover:text-white transition-all duration-400 ease-in-out'
											onClick={(e) => {
												setAmoutToAdd(400);
											}}>
											₹ 400
										</motion.div>
										<motion.div
											variants={item}
											className='py-1 px-3 cursor-pointer rounded-md my-auto text-center border-2 text-lg  border-green  text-primary hover:bg-green hover:text-white transition-all duration-400 ease-in-out'
											onClick={(e) => {
												setAmoutToAdd(800);
											}}>
											₹ 800
										</motion.div>
										<motion.div
											variants={item}
											className='py-1 px-2 cursor-pointer rounded-md my-auto text-center border-2 text-lg  border-green  text-primary hover:bg-green hover:text-white transition-all duration-400 ease-in-out'
											onClick={(e) => {
												setAmoutToAdd(1200);
											}}>
											₹ 1200
										</motion.div>
										<motion.div
											variants={item}
											className='py-1 px-2 cursor-pointer rounded-md my-auto text-center border-2 text-lg  border-green  text-primary hover:bg-green hover:text-white transition-all duration-400 ease-in-out'
											onClick={(e) => {
												setAmoutToAdd(1600);
											}}>
											₹ 1600
										</motion.div>
										<motion.div
											variants={item}
											className='py-1 px-2 cursor-pointer rounded-md my-auto text-center border-2 text-lg  border-green  text-primary hover:bg-green hover:text-white transition-all duration-400 ease-in-out'
											onClick={(e) => {
												setAmoutToAdd(2000);
											}}>
											₹ 2000
										</motion.div>
										<motion.div
											variants={item}
											className='py-1 px-2 cursor-pointer rounded-md my-auto text-center border-2 text-lg  border-green  text-primary hover:bg-green hover:text-white transition-all duration-400 ease-in-out'
											onClick={(e) => {
												setAmoutToAdd(2500);
											}}>
											₹ 2500
										</motion.div>
									</motion.div>
								</div>
								<div className='lowerPart  h-1/2   flex flex-col justify-between items-center py-3'>
									<div className='text-green text-lg lg:text-xl '>
										What is the source of income?
									</div>
									<motion.div
										ref={ref}
										className='  lg:px-8 py-6 flex h-full md:h-1/2 w-11/12 md:w-3/4 justify-between items-center '>
										<motion.div
											initial={{ scale: 0, rotate: 180 }}
											animate={animation}
											transition={{
												type: 'spring',
												stiffness: 260,
												damping: 40,
											}}
											className=' h-28 lg:h-11/12 w-20 lg:w-1/4 border-2 cursor-pointer  flex flex-col items-center justify-center  px-3 '
											id='Salary'
											onClick={(e) => {
												handleIncomeSource(
													e.currentTarget.classList,
													e.currentTarget.id
												);
											}}>
											<img src={Cash} alt='' />
											<p className='text-sm text-green font-semibold uppercase pt-2 '>
												Salary
											</p>
										</motion.div>
										<motion.div
											initial={{ scale: 0, rotate: 180 }}
											animate={animation}
											transition={{
												type: 'spring',
												stiffness: 260,
												damping: 40,
											}}
											className=' h-28 lg:h-11/12 w-20 lg:w-1/4 border-2 cursor-pointer  flex flex-col items-center justify-center  px-3 '
											id='Passive'
											onClick={(e) => {
												handleIncomeSource(
													e.currentTarget.classList,
													e.currentTarget.id
												);
											}}>
											<img src={PassiveIncome} alt='' />
											<p className='text-sm text-green font-semibold uppercase pt-2 '>
												Paasive
											</p>
										</motion.div>
										<motion.div
											initial={{ scale: 0, rotate: 180 }}
											animate={animation}
											transition={{
												type: 'spring',
												stiffness: 260,
												damping: 40,
											}}
											className=' h-28 lg:h-11/12 w-20 lg:w-1/4 border-2 cursor-pointer  flex flex-col items-center justify-center  px-3 '
											id='Other'
											onClick={(e) => {
												handleIncomeSource(
													e.currentTarget.classList,
													e.currentTarget.id
												);
											}}>
											<img src={Other} alt='' />
											<p className='text-sm text-green font-semibold uppercase pt-2 '>
												Other
											</p>
										</motion.div>
									</motion.div>
									<motion.div
										whileHover={{
											scale: 1.1,
											transition: { duration: 0.3 },
										}}
										whileTap={{ scale: 0.9 }}
										className='w-full  pb-3 flex justify-center items-center'>
										<input
											type='button'
											className='w-10/12 py-2 rounded-lg bg-primary text-white text-xl cursor-pointer'
											value='Add funds'
											onClick={HandleAddMoney}
										/>
									</motion.div>
								</div>
							</div>
						</div>
					</div>
					<AnimatePresence>
						{ShowAlert ? (
							<motion.div
								initial={{ x: '100vw' }}
								animate={{ x: 0 }}
								exit={{ opacity: 0, transition: 'all 0.5s ease-out' }}
								transition={{ duration: 1 }}
								className='absolute right-3 bottom-6 w-3/4 sm:w-1/4 p-2 py-1 bg-green items-center text-indigo-100 leading-none rounded-md flex lg:inline-flex'
								role='alert'>
								<span className='flex rounded-full bg-green uppercase px-2 py-1 text-sm font-bold mr-3'>
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
											d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
										/>
									</svg>
								</span>
								<span className=' text-sm font-semibold mr-2 text-center flex-auto'>
									Successfully added money!
								</span>
								<svg
									onClick={() => setShowAlert(false)}
									xmlns='http://www.w3.org/2000/svg'
									className='h-6 w-6 cursor-pointer'
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
							</motion.div>
						) : null}
					</AnimatePresence>
				</div>
			)}
		</>
	);
};

export default AddMoney;

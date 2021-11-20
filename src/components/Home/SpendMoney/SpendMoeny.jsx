import React, { useEffect, useState } from 'react';
import './SpendMoney.scss';
import Home from '../../../images/home.png';
import Car from '../../../images/car.png';
import Food from '../../../images/food.png';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import AnimatedNumber from 'animated-number-react';
import { useHistory } from 'react-router';
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
const SpendMoney = () => {
	const [CurrentBalance, setCurrentBalance] = useState(34680); //Fetch here
	const [UpdatedBalance, setUpdatedBalance] = useState(34680);
	const [AmoutToSpend, setAmoutToSpend] = useState();
	const [ReasonToSpend, setReasonToSpend] = useState(null);
	const [ShowAlert, setShowAlert] = useState(false);
	const [other, setother] = useState(false);
	const [otherSelectedOption, setotherSelectedOption] = useState(null);
	const [showDropDown, setshowDropDown] = useState(false);
	const [otherReason, setotherReason] = useState('');
	const [userId, setUserId] = useState(cookie.get('userId'));
	const [todaysDate, settodaysDate] = useState('');
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
		//now.setDate(12);
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
		console.log('This is true');
		if (id == 'Other') {
			console.log('This is In Incomr');

			setReasonToSpend('Other');
			setother(true);
		} else {
			document.getElementById('Housing').classList.remove('border-red');
			document.getElementById('Transport').classList.remove('border-red');
			document.getElementById('Other').classList.remove('border-red');
			classList.add('border-red');
			console.log(id);

			setReasonToSpend(id);
		}
	};
	const formatValue = (value) => `₹ ${Number(value).toLocaleString()}`;
	const UpdateData = (money, reason, OtherReason) => {
		axios
			.post(
				process.env.REACT_APP_BASE_URL + 'spend-money',
				{
					money: money,
					resaon: reason,
					userId: userId,
					date: todaysDate,
					OtherReason: OtherReason,
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
	};
	const HandleSpendMoney = async () => {
		setShowAlert(false);
		const updatedAmmount = CurrentBalance - AmoutToSpend;
		if (!other) {
			if (AmoutToSpend == null) {
				alert('Please Enter a Valid Amount');
			} else if (ReasonToSpend === null) {
				alert('Please select Mode of Income');
			} else {
				setUpdatedBalance(updatedAmmount); // async
				UpdateData(AmoutToSpend, ReasonToSpend, otherReason);
				console.log(
					'Balance:',
					CurrentBalance,
					'Update:',
					UpdatedBalance,
					'Total amount Added:',
					AmoutToSpend,
					'Mode of payment:',
					ReasonToSpend
				);
			}
		} else {
			if (AmoutToSpend) {
				UpdateData(AmoutToSpend, otherSelectedOption, otherReason);
				setUpdatedBalance(updatedAmmount);
				console.log(
					'Mode :',
					ReasonToSpend,
					'Reason :',
					otherSelectedOption,
					'Total fookin amount spoend :',
					AmoutToSpend
				);
			} else if (!otherSelectedOption) {
				alert('Select fookin Category');
			} else {
				alert('Add fookin amount');
			}
		}
	};
	return (
		<>
			{isLoading ? (
				<Loading />
			) : (
				<div className='SpendMoneyContainer p-8  relative'>
					<div className='flex flex-col md:flex-row justify-between h-full items-center  '>
						{/*Back Button */}
						<div className='bckbtn h-full'>
							<button
								className='   text-black  cursor-pointer w-12 h-12 top-0 left-0'
								onClick={() => {
									history.goBack();
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
						</div>
						<div className=' w-1/2 h-full flex flex-col  '>
							<motion.div
								initial={{ opacity: 0, x: -50 }}
								transition={{ duration: 1 }}
								animate={{ opacity: 0.7, x: 0 }}
								className='currentBalance h-1/2 text-3xl md:text-6xl flex flex-col justify-center items-center text-black'>
								₹ {CurrentBalance.toLocaleString()}
								<p className='text-base md:text-lg pb-4 md:pt-4 md:pb-0 text-center'>
									Current Balance
								</p>
							</motion.div>
							<motion.div
								initial={{ opacity: 0, x: 50 }}
								transition={{
									duration: 1,
								}}
								animate={{ opacity: 1, x: 0 }}
								className='updatedBalance h-1/2 text-3xl md:text-6xl flex flex-col justify-center items-center text-red'>
								<AnimatedNumber
									value={UpdatedBalance}
									formatValue={formatValue}
									duration={250}
								/>
								<p className='text-base md:text-lg pb-4 md:pt-4 md:pb-0 text-center'>
									Balance Spending Adding Money
								</p>
							</motion.div>
						</div>
						<div className=' w-full md:w-1/2 px-0 py-3 md:px-16 h-full '>
							<div className='border h-full lg:w-11/12  flex flex-col bg-blur text-black rounded-md'>
								<div className='upperPart h-1/2 flex flex-col justify-between items-center py-5'>
									<div className='text-red text-lg lg:text-xl'>
										How much would you like to spend?
									</div>
									{other ? (
										<>
											<div className=' py-10 px-5 md:px-6 w-full grid grid-cols-3 gap-8 overflow-hidden'>
												<motion.div
													initial={{ opacity: 0 }}
													animate={{ opacity: 1 }}
													transition={{
														duration: 1,
													}}
													className=' h-28 lg:h-11/12 mx-auto md:mx-6 md:py-3  cursor-pointer flex flex-col items-center justify-center   border-black '
													id='Other'
													onClick={(e) => {
														handleIncomeSource(
															e.currentTarget.classList,
															e.currentTarget.id
														);
													}}>
													<img
														src={Food}
														className='h-full w-full p-2 md:py-0 '
														alt=''
													/>
													<p className='text-sm text-red font-semibold uppercase pt-1'>
														Other
													</p>
												</motion.div>

												<div className='dropdown  col-span-2 flex flex-col justify-between items-center  '>
													<motion.button
														initial={{ opacity: 0, y: -20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ duration: 0.7 }}
														className='bg-gray-300 text-gray-500 text-sm font-semibold py-1 px-4 rounded inline-flex items-center'
														onClick={() => setshowDropDown(!showDropDown)}>
														<span className='mr-1 text-sm sm:text-base'>
															{otherSelectedOption
																? otherSelectedOption
																: 'Type of expense'}
														</span>
														<svg
															className='fill-current h-4 w-4'
															xmlns='http://www.w3.org/2000/svg'
															viewBox='0 0 20 20'>
															<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />{' '}
														</svg>
													</motion.button>
													{showDropDown ? (
														<ul className='dropdown-menu absolute hidden text-gray-500 pt-7 px-4 z-10 '>
															<li
																className='border border-gray-300 w-36 rounded-none text-sm sm:text-base '
																onClick={() => setshowDropDown(!showDropDown)}>
																<p
																	onClick={(e) =>
																		setotherSelectedOption(
																			e.currentTarget.innerText
																		)
																	}
																	className='rounded bg-white text-black hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap cursor-pointer '>
																	Food
																</p>
															</li>
															<li
																className='border border-gray-300 w-36 rounded-none text-sm sm:text-base border-t-0 '
																onClick={() => setshowDropDown(!showDropDown)}>
																<p
																	onClick={(e) =>
																		setotherSelectedOption(
																			e.currentTarget.innerText
																		)
																	}
																	className='rounded bg-white hover:border hover:border-red hover:border-l-2 text-black hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap cursor-pointer'>
																	Utilities
																</p>
															</li>
															<li
																className='border border-gray-300 w-36 rounded-none text-sm sm:text-base border-t-0 '
																onClick={() => setshowDropDown(!showDropDown)}>
																<p
																	onClick={(e) =>
																		setotherSelectedOption(
																			e.currentTarget.innerText
																		)
																	}
																	className='rounded bg-white hover:border hover:border-red hover:border-l-2 text-black hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap cursor-pointer'>
																	Medical
																</p>
															</li>
															<li
																className='border border-gray-300 w-36 rounded-none text-sm sm:text-base border-t-0 '
																onClick={() => setshowDropDown(!showDropDown)}>
																<p
																	onClick={(e) =>
																		setotherSelectedOption(
																			e.currentTarget.innerText
																		)
																	}
																	className='rounded bg-white hover:border hover:border-red hover:border-l-2 text-black hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap cursor-pointer'>
																	Entertainment
																</p>
															</li>
														</ul>
													) : null}
													<motion.div
														initial={{ opacity: 0, y: 20 }}
														animate={{ opacity: 1, y: 0 }}
														transition={{ duration: 0.7 }}
														className='flex justify-center items-center text-red text-xl -ml-4'>
														₹
														<input
															className={`bg-transparent border-b-2 w-2/3 text-center ml-4 ${
																AmoutToSpend > 0 ? 'border-red' : null
															}`}
															type='number'
															value={AmoutToSpend}
															onChange={(e) =>
																setAmoutToSpend(Number(e.target.value))
															}
														/>
													</motion.div>
												</div>
											</div>
											<motion.input
												initial={{ x: '50vw' }}
												animate={{ x: 0 }}
												transition={{ duration: 1 }}
												className='mx-auto  py-2 w-10/12 border bg-transparent focus:outline-none focus:border-black px-4 text-primary'
												type='text'
												placeholder='Enter description (optional)*'
												value={otherReason}
												onChange={(e) => setotherReason(e.target.value)}
											/>
										</>
									) : (
										<>
											<div className='-ml-4 py-6 lg:py-0'>
												<div className='flex justify-center items-center text-primary text-xl'>
													₹
													<input
														className='bg-transparent border-b-2 w-1/3 text-center ml-4 '
														type='number'
														value={AmoutToSpend}
														onChange={(e) =>
															setAmoutToSpend(Number(e.target.value))
														}
													/>
												</div>
											</div>
											<motion.div
												variants={container}
												initial='hidden'
												animate='visible'
												className='MoneyOptions grid grid-cols-2 gap-3  sm:flex sm:justify-between sm:items-center sm:w-3/4 h-60 lg:h-1/2 flex-wrap px-10'>
												<motion.div
													variants={item}
													className='py-1 px-3 cursor-pointer rounded-md my-auto text-center border-2 text-lg border-red  text-primary hover:bg-red hover:text-white transition-all duration-400 ease-in-out'
													onClick={(e) => {
														setAmoutToSpend(100);
													}}>
													₹ 100
												</motion.div>
												<motion.div
													variants={item}
													className='py-1 px-3 cursor-pointer rounded-md my-auto text-center border-2 text-lg border-red  text-primary hover:bg-red hover:text-white transition-all duration-400 ease-in-out'
													onClick={(e) => {
														setAmoutToSpend(200);
													}}>
													₹ 200
												</motion.div>
												<motion.div
													variants={item}
													className='py-1 px-3 cursor-pointer rounded-md my-auto text-center border-2 text-lg border-red  text-primary hover:bg-red hover:text-white transition-all duration-400 ease-in-out'
													onClick={(e) => {
														setAmoutToSpend(400);
													}}>
													₹ 400
												</motion.div>
												<motion.div
													variants={item}
													className='py-1 px-3 cursor-pointer rounded-md my-auto text-center border-2 text-lg border-red  text-primary hover:bg-red hover:text-white transition-all duration-400 ease-in-out'
													onClick={(e) => {
														setAmoutToSpend(800);
													}}>
													₹ 800
												</motion.div>
												<motion.div
													variants={item}
													className='py-1 px-2 cursor-pointer rounded-md my-auto text-center border-2 text-lg border-red  text-primary hover:bg-red hover:text-white transition-all duration-400 ease-in-out'
													onClick={(e) => {
														setAmoutToSpend(1200);
													}}>
													₹ 1200
												</motion.div>
												<motion.div
													variants={item}
													className='py-1 px-2 cursor-pointer rounded-md my-auto text-center border-2 text-lg border-red  text-primary hover:bg-red hover:text-white transition-all duration-400 ease-in-out'
													onClick={(e) => {
														setAmoutToSpend(1600);
													}}>
													₹ 1600
												</motion.div>
												<motion.div
													variants={item}
													className='py-1 px-2 cursor-pointer rounded-md my-auto text-center border-2 text-lg border-red  text-primary hover:bg-red hover:text-white transition-all duration-400 ease-in-out'
													onClick={(e) => {
														setAmoutToSpend(2000);
													}}>
													₹ 2000
												</motion.div>
												<motion.div
													variants={item}
													className='py-1 px-2 cursor-pointer rounded-md my-auto text-center border-2 text-lg border-red  text-primary hover:bg-red hover:text-white transition-all duration-400 ease-in-out'
													onClick={(e) => {
														setAmoutToSpend(2500);
													}}>
													₹ 2500
												</motion.div>
											</motion.div>
										</>
									)}
								</div>

								<div
									className={` lowerPart h-1/2 flex flex-col ${
										other ? ' justify-end' : 'justify-between'
									} items-center py-3`}>
									{other ? null : (
										<>
											<div className='text-red text-lg lg:text-xl'>
												Where did the money go?
											</div>
											<motion.div
												ref={ref}
												className=' lg:px-8 py-6 flex h-full md:h-1/2 w-3/4 justify-between items-center'>
												<motion.div
													initial={{ scale: 0, rotate: 180 }}
													animate={animation}
													transition={{
														type: 'spring',
														stiffness: 260,
														damping: 40,
													}}
													className=' h-28 lg:h-11/12 w-20 lg:w-1/4 border-2 cursor-pointer flex flex-col items-center justify-center  px-3 '
													id='Housing'
													onClick={(e) => {
														handleIncomeSource(
															e.currentTarget.classList,
															e.currentTarget.id
														);
													}}>
													<img src={Home} alt='' />
													<p className='text-sm text-red font-semibold uppercase pt-2 '>
														Housing
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
													className=' h-28 lg:h-11/12 w-20 lg:w-1/4 border-2 cursor-pointer flex flex-col items-center justify-center  px-3 '
													id='Transport'
													onClick={(e) => {
														handleIncomeSource(
															e.currentTarget.classList,
															e.currentTarget.id
														);
													}}>
													<img src={Car} alt='' />
													<p className='text-sm text-red font-semibold uppercase pt-0  md:pt-2  '>
														Transport
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
													className=' h-28 lg:h-11/12 w-20 lg:w-1/4 border-2 cursor-pointer flex flex-col items-center justify-center  px-3 '
													id='Other'
													onClick={(e) => {
														handleIncomeSource(
															e.currentTarget.classList,
															e.currentTarget.id
														);
													}}>
													<img src={Food} alt='' />
													<p className='text-sm text-red font-semibold uppercase pt-0  md:pt-3'>
														Other
													</p>
												</motion.div>
											</motion.div>
										</>
									)}
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
											value='Spent funds'
											onClick={HandleSpendMoney}
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
								className='absolute right-3 bottom-6 w-3/4 sm:w-1/4 p-2 py-1 bg-red items-center text-indigo-100 leading-none rounded-md flex lg:inline-flex'
								role='alert'>
								<span className='flex rounded-full bg-red uppercase px-2 py-1 text-sm font-bold mr-3'>
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
									Successfully spent money!
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

export default SpendMoney;

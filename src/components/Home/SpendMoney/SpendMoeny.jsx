import React, { useEffect, useState } from 'react';
import './SpendMoney.scss';
import Home from '../../../images/home.png';
import Car from '../../../images/car.png';
import Food from '../../../images/food.png';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import AnimatedNumber from 'animated-number-react';
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
	const [AmoutToAdd, setAmoutToAdd] = useState(0);
	const [ModeOFIncome, setModeOFIncome] = useState(null);
	const [ShowAlert, setShowAlert] = useState(false);

	const { ref, inView } = useInView({
		threshold: 1,
	});
	const animation = useAnimation();
	useEffect(() => {
		if (inView) {
			animation.start({ rotate: 0, scale: 1 });
		}
	}, [inView]);
	const handleIncomeSource = (classList, id) => {
		document.getElementById('Salary').classList.remove('border-red');
		document.getElementById('Passive').classList.remove('border-red');
		document.getElementById('Food').classList.remove('border-red');
		classList.add('border-red');
		console.log(id);
		setModeOFIncome(id);
	};
	const formatValue = (value) => `₹ ${Number(value).toLocaleString()}`;
	const HandleSpendMoney = () => {
		if (AmoutToAdd === 0) {
			alert('Please Enter a Valid Amount');
		} else if (ModeOFIncome === null) {
			alert('Please select Mode of Income');
		} else {
			const updatedAmmount = CurrentBalance - AmoutToAdd;
			setUpdatedBalance(updatedAmmount); // async
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
			setShowAlert(true);
		}
	};
	return (
		<div className='SpendMoneyContainer p-8  relative'>
			<div className='flex flex-col md:flex-row justify-between h-full items-center  '>
				<div className=' w-1/2 h-full flex flex-col  '>
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						transition={{ duration: 1 }}
						animate={{ opacity: 0.7, x: 0 }}
						className='currentBalance h-1/2 text-4xl md:text-6xl flex flex-col justify-center items-center text-black'>
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
						className='updatedBalance h-1/2 text-4xl md:text-6xl flex flex-col justify-center items-center text-red'>
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
							<div className='-ml-4 py-6 lg:py-0'>
								<div className='flex justify-center items-center text-primary text-xl'>
									₹
									<input
										className='bg-transparent border-b-2 w-1/3 text-center ml-4 '
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
								className='MoneyOptions grid grid-cols-2 gap-3  sm:flex sm:justify-between sm:items-center sm:w-3/4 h-60 lg:h-1/2 flex-wrap px-10'>
								<motion.div
									variants={item}
									className='py-1 px-3 cursor-pointer rounded-md my-auto text-center border-2 text-lg border-red  text-primary hover:bg-red hover:text-white transition-all duration-400 ease-in-out'
									onClick={(e) => {
										setAmoutToAdd(100);
									}}>
									₹ 100
								</motion.div>
								<motion.div
									variants={item}
									className='py-1 px-3 cursor-pointer rounded-md my-auto text-center border-2 text-lg border-red  text-primary hover:bg-red hover:text-white transition-all duration-400 ease-in-out'
									onClick={(e) => {
										setAmoutToAdd(200);
									}}>
									₹ 200
								</motion.div>
								<motion.div
									variants={item}
									className='py-1 px-3 cursor-pointer rounded-md my-auto text-center border-2 text-lg border-red  text-primary hover:bg-red hover:text-white transition-all duration-400 ease-in-out'
									onClick={(e) => {
										setAmoutToAdd(400);
									}}>
									₹ 400
								</motion.div>
								<motion.div
									variants={item}
									className='py-1 px-3 cursor-pointer rounded-md my-auto text-center border-2 text-lg border-red  text-primary hover:bg-red hover:text-white transition-all duration-400 ease-in-out'
									onClick={(e) => {
										setAmoutToAdd(800);
									}}>
									₹ 800
								</motion.div>
								<motion.div
									variants={item}
									className='py-1 px-2 cursor-pointer rounded-md my-auto text-center border-2 text-lg border-red  text-primary hover:bg-red hover:text-white transition-all duration-400 ease-in-out'
									onClick={(e) => {
										setAmoutToAdd(1200);
									}}>
									₹ 1200
								</motion.div>
								<motion.div
									variants={item}
									className='py-1 px-2 cursor-pointer rounded-md my-auto text-center border-2 text-lg border-red  text-primary hover:bg-red hover:text-white transition-all duration-400 ease-in-out'
									onClick={(e) => {
										setAmoutToAdd(1600);
									}}>
									₹ 1600
								</motion.div>
								<motion.div
									variants={item}
									className='py-1 px-2 cursor-pointer rounded-md my-auto text-center border-2 text-lg border-red  text-primary hover:bg-red hover:text-white transition-all duration-400 ease-in-out'
									onClick={(e) => {
										setAmoutToAdd(2000);
									}}>
									₹ 2000
								</motion.div>
								<motion.div
									variants={item}
									className='py-1 px-2 cursor-pointer rounded-md my-auto text-center border-2 text-lg border-red  text-primary hover:bg-red hover:text-white transition-all duration-400 ease-in-out'
									onClick={(e) => {
										setAmoutToAdd(2500);
									}}>
									₹ 2500
								</motion.div>
							</motion.div>
						</div>
						<div className='lowerPart h-1/2 flex flex-col justify-between items-center py-3'>
							<div className='text-red text-lg lg:text-xl'>
								Where did the money go?
							</div>
							<motion.div
								ref={ref}
								className='lg:px-8 py-6 flex h-full w-3/4 justify-between items-center'>
								<motion.div
									initial={{ scale: 0, rotate: 180 }}
									animate={animation}
									transition={{
										type: 'spring',
										stiffness: 260,
										damping: 40,
									}}
									className=' h-28 lg:h-11/12 w-20 lg:w-1/4 border-2 cursor-pointer flex flex-col items-center justify-center  px-3 '
									id='Salary'
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
									id='Passive'
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
									id='Food'
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
	);
};

export default SpendMoney;

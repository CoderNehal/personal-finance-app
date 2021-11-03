import React, { useEffect, useState } from 'react';
import './AddMoney.scss';
import Cash from '../../../images/cash.png';
import PassiveIncome from '../../../images/PassiveIncome.png';
import Other from '../../../images/Other.png';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
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
const AddMoney = () => {
	const [CurrentBalance, setCurrentBalance] = useState(34680); //Fetch here
	const [UpdatedBalance, setUpdatedBalance] = useState(34680);
	const [AmoutToAdd, setAmoutToAdd] = useState(0);
	const [ModeOFIncome, setModeOFIncome] = useState(null);
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
		document.getElementById('Salary').classList.remove('border-primary');
		document.getElementById('Passive').classList.remove('border-primary');
		document.getElementById('Other').classList.remove('border-primary');
		classList.add('border-primary');
		console.log(id);
		setModeOFIncome(id);
	};
	const formatValue = (value) => `₹ ${Number(value).toLocaleString()}`;
	const HandleAddMoney = () => {
		if (AmoutToAdd === 0) {
			alert('Please Enter a Valid Amount');
		} else if (ModeOFIncome === null) {
			alert('Please select Mode of Income');
		} else {
			const updatedAmmount = CurrentBalance + AmoutToAdd;
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
		}
	};
	return (
		<div className='AddMoneyContainer p-8 '>
			<div className='flex flex-col md:flex-row justify-between h-full items-center '>
				<div className=' w-1/2 h-full flex flex-col'>
					<motion.div
						initial={{ opacity: 0, x: -50 }}
						transition={{ duration: 1 }}
						animate={{ opacity: 0.7, x: 0 }}
						className='currentBalance h-1/2 text-4xl md:text-6xl flex flex-col justify-center items-center text-white'>
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
						className='updatedBalance h-1/2 text-4xl md:text-6xl flex flex-col justify-center items-center text-green'>
						<AnimatedNumber
							value={UpdatedBalance}
							formatValue={formatValue}
							duration={250}
						/>
						<p className='text-base md:text-lg pb-4 md:pt-4 md:pb-0 text-center'>
							Balance After Adding Money
						</p>
					</motion.div>
				</div>
				<div className=' w-full md:w-1/2 px-0 py-3 md:px-16 h-full '>
					<div className='border h-full lg:w-11/12  flex flex-col bg-white text-black rounded-md'>
						<div className='upperPart h-1/2 flex flex-col justify-between items-center py-5'>
							<div className='text-green text-lg lg:text-xl'>
								How much would you like to add?
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
								className='MoneyOptions flex justify-between items-center w-3/4 h-60 lg:h-1/2 flex-wrap px-10 s'>
								<motion.div
									variants={item}
									className='py-1 px-3 cursor-pointer rounded-md border-2 text-lg border-primary  text-primary'
									onClick={(e) => {
										setAmoutToAdd(100);
									}}>
									₹ 100
								</motion.div>
								<motion.div
									variants={item}
									className='py-1 px-3 cursor-pointer rounded-md border-2 text-lg border-primary  text-primary'
									onClick={(e) => {
										setAmoutToAdd(200);
									}}>
									₹ 200
								</motion.div>
								<motion.div
									variants={item}
									className='py-1 px-3 cursor-pointer rounded-md border-2 text-lg border-primary  text-primary'
									onClick={(e) => {
										setAmoutToAdd(400);
									}}>
									₹ 400
								</motion.div>
								<motion.div
									variants={item}
									className='py-1 px-3 cursor-pointer rounded-md border-2 text-lg border-primary  text-primary'
									onClick={(e) => {
										setAmoutToAdd(800);
									}}>
									₹ 800
								</motion.div>
								<motion.div
									variants={item}
									className='py-1 px-2 cursor-pointer rounded-md border-2 text-lg border-primary  text-primary'
									onClick={(e) => {
										setAmoutToAdd(1200);
									}}>
									₹ 1200
								</motion.div>
								<motion.div
									variants={item}
									className='py-1 px-2 cursor-pointer rounded-md border-2 text-lg border-primary  text-primary'
									onClick={(e) => {
										setAmoutToAdd(1600);
									}}>
									₹ 1600
								</motion.div>
								<motion.div
									variants={item}
									className='py-1 px-2 cursor-pointer rounded-md border-2 text-lg border-primary  text-primary'
									onClick={(e) => {
										setAmoutToAdd(2000);
									}}>
									₹ 2000
								</motion.div>
								<motion.div
									variants={item}
									className='py-1 px-2 cursor-pointer rounded-md border-2 text-lg border-primary  text-primary'
									onClick={(e) => {
										setAmoutToAdd(2500);
									}}>
									₹ 2500
								</motion.div>
							</motion.div>
						</div>
						<div className='lowerPart h-1/2 flex flex-col justify-between items-center py-3'>
							<div className='text-green text-lg lg:text-xl'>
								What is the source of income?
							</div>
							<motion.div
								ref={ref}
								className='lg:px-8 py-6 flex h-full w-3/4 justify-between '>
								<motion.div
									initial={{ scale: 0, rotate: 180 }}
									animate={animation}
									transition={{
										type: 'spring',
										stiffness: 260,
										damping: 40,
									}}
									className=' h-28 lg:h-full w-20 lg:w-1/4 border-2  flex flex-col items-center justify-center py-2 px-3 '
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
									className=' h-28 lg:h-full w-20 lg:w-1/4 border-2  flex flex-col items-center justify-center py-2 px-3 '
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
									className=' h-28 lg:h-full w-20 lg:w-1/4 border-2  flex flex-col items-center justify-center py-2 px-3 '
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
		</div>
	);
};

export default AddMoney;

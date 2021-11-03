import React, { useState } from 'react';
import './AddMoney.scss';
import Cash from '../../../images/cash.png';
import PassiveIncome from '../../../images/PassiveIncome.png';
import Other from '../../../images/Other.png';
const AddMoney = () => {
	const [CurrentBalance, setCurrentBalance] = useState(34680); //Fetch here
	const [UpdatedBalance, setUpdatedBalance] = useState(34680);
	const [AmoutToAdd, setAmoutToAdd] = useState(0);
	const [ModeOFIncome, setModeOFIncome] = useState(null);
	const handleIncomeSource = (classList, id) => {
		document.getElementById('Salary').classList.remove('border-primary');
		document.getElementById('Passive').classList.remove('border-primary');
		document.getElementById('Other').classList.remove('border-primary');
		classList.add('border-primary');
		console.log(id);
		setModeOFIncome(id);
	};
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
					<div className='currentBalance h-1/2 text-4xl md:text-6xl flex flex-col justify-center items-center text-white'>
						₹ {CurrentBalance.toLocaleString()}
						<p className='text-base md:text-lg pb-4 md:pt-4 md:pb-0 text-center'>Current Balance</p>
					</div>
					<div className='updatedBalance h-1/2 text-4xl md:text-6xl flex flex-col justify-center items-center text-green'>
						₹ {UpdatedBalance.toLocaleString()}
						<p className='text-base md:text-lg pb-4 md:pt-4 md:pb-0 text-center'>Balance After Adding Money</p>
					</div>
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
							<div className='MoneyOptions flex justify-between items-center w-3/4 h-60 lg:h-1/2 flex-wrap px-10 s' >
								<div
									className='py-1 px-3 cursor-pointer rounded-md border-2 text-lg border-primary  text-primary'
									onClick={(e) => {
										setAmoutToAdd(100);
									}}>
									₹ 100
								</div>
								<div
									className='py-1 px-3 cursor-pointer rounded-md border-2 text-lg border-primary  text-primary'
									onClick={(e) => {
										setAmoutToAdd(200);
									}}>
									₹ 200
								</div>
								<div
									className='py-1 px-3 cursor-pointer rounded-md border-2 text-lg border-primary  text-primary'
									onClick={(e) => {
										setAmoutToAdd(400);
									}}>
									₹ 400
								</div>
								<div
									className='py-1 px-3 cursor-pointer rounded-md border-2 text-lg border-primary  text-primary'
									onClick={(e) => {
										setAmoutToAdd(800);
									}}>
									₹ 800
								</div>
								<div
									className='py-1 px-2 cursor-pointer rounded-md border-2 text-lg border-primary  text-primary'
									onClick={(e) => {
										setAmoutToAdd(1200);
									}}>
									₹ 1200
								</div>
								<div
									className='py-1 px-2 cursor-pointer rounded-md border-2 text-lg border-primary  text-primary'
									onClick={(e) => {
										setAmoutToAdd(1600);
									}}>
									₹ 1600
								</div>
								<div
									className='py-1 px-2 cursor-pointer rounded-md border-2 text-lg border-primary  text-primary'
									onClick={(e) => {
										setAmoutToAdd(2000);
									}}>
									₹ 2000
								</div>
								<div
									className='py-1 px-2 cursor-pointer rounded-md border-2 text-lg border-primary  text-primary'
									onClick={(e) => {
										setAmoutToAdd(2500);
									}}>
									₹ 2500
								</div>
							</div>
						</div>
						<div className='lowerPart h-1/2 flex flex-col justify-between items-center py-3'>
							<div className='text-green text-lg lg:text-xl'>
								What is the source of income?
							</div>
							<div className='lg:px-8 py-6 flex h-full w-3/4 justify-between '>
								<div
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
								</div>
								<div
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
								</div>
								<div
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
								</div>
							</div>
							<div className='w-full  pb-3 flex justify-center items-center'>
								<input
									type='button'
									className='w-10/12 py-2 rounded-lg bg-primary text-white text-xl cursor-pointer'
									value='Add funds'
									onClick={HandleAddMoney}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddMoney;

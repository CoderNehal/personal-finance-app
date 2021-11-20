import React, { useEffect, useState } from 'react';
import dateFormat from 'dateformat';
import { useLocation, useHistory } from 'react-router-dom';
import './index.scss';
const TransactionDetails = () => {
	const [data, setdata] = useState({});
	const Location = useLocation();
	const history = useHistory();
	const HandlePrintRecipt = () => {
		alert('Recipt downloaded successfullyy!');
	};
	useEffect(() => {
		
		setdata(Location.query);
	}, []);
	return (
		<>
			{data ? (
				<div className='modal active border-0  '>
					<a
						className='close-modal'
						onClick={() => {
							history.goBack();
						}}>
						<svg viewBox='0 0 20 20'>
							<path
								fill='#000000'
								d='M15.898,4.045c-0.271-0.272-0.713-0.272-0.986,0l-4.71,4.711L5.493,4.045c-0.272-0.272-0.714-0.272-0.986,0s-0.272,0.714,0,0.986l4.709,4.711l-4.71,4.711c-0.272,0.271-0.272,0.713,0,0.986c0.136,0.136,0.314,0.203,0.492,0.203c0.179,0,0.357-0.067,0.493-0.203l4.711-4.711l4.71,4.711c0.137,0.136,0.314,0.203,0.494,0.203c0.178,0,0.355-0.067,0.492-0.203c0.273-0.273,0.273-0.715,0-0.986l-4.711-4.711l4.711-4.711C16.172,4.759,16.172,4.317,15.898,4.045z'></path>
						</svg>
					</a>
					<div className='modal-content '>
						<h2 className=' sm:underline  pb-6 sm:pb-3 font-semibold leading-4 whitespace-normal text-2xl px-6 sm:px-2 py-6 text-secondary'>
							Transaction Details
						</h2>
						<div className='w-full h-full px-5 sm:px-16 py-10   flex flex-col '>
							<p className='py-3 text-lg  text-black grid grid-cols-2'>
								Transaction Id : <span>{data.id}</span>
							</p>
							<p className='py-3 text-lg  text-black grid grid-cols-2'>
								Transaction Type :{' '}
								{data.type == 'credit' ? (
									<span className='text-green capitalize'>credit</span>
								) : (
									<span className='text-red capitalize'>debit</span>
								)}
							</p>
							<p className='py-3 text-lg  text-black grid grid-cols-2'>
								Transaction Amount :
								{data.added ? (
									<span>+ ₹{data.added}</span>
								) : (
									<span>- ₹{data.spent}</span>
								)}
							</p>
							<p className='py-3 text-lg  text-black grid grid-cols-2'>
								Transaction Reaon :
								<span>{data.modeOfIncome || data.reason}</span>
							</p>
							<p className='py-3 text-lg  text-black grid grid-cols-2'>
								<span>Transaction Date :</span>
								<span>{dateFormat(data.date, 'ddd ,dd mmm yyyy, hh:mm')}</span>
							</p>
							<p className='py-3 text-lg  text-black grid grid-cols-2'>
								Transaction details <br /> (if any) :
								<span className='pt-7'>{data.other ? data.other : 'none'}</span>
							</p>
							{/* // make a transaction slip */}
							<button
								className=' rounded-md p-2 text-lg mt-10 bg-secondary text-white'
								onClick={HandlePrintRecipt}>
								Print
							</button>
						</div>
					</div>
				</div>
			) : (
				<p className='text-center text-black'>Something went wrong mate</p>
			)}
		</>
	);
};

export default TransactionDetails;

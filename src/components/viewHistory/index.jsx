import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './index.scss';
import cookie from 'js-cookie';
import Chart from './Chart';
import Tabular from './Tabular';
import Loading from '../Loading';
import { AnimatePresence } from 'framer-motion';
import { useHistory } from 'react-router-dom';
const ViewHistory = () => {
	const [TransactionHistory, setTransactionHistory] = useState(null);
	const [chart, setchart] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	const history = useHistory();

	useEffect(() => {
		setisLoading(true);
		axios
			.get(process.env.REACT_APP_BASE_URL + 'view-history', {
				params: {
					userId: cookie.get('userId'),
				},
				headers: {
					'content-type': 'application/json',
				},
			})
			.then((res) => {
				
				setTransactionHistory(
					res.data.TransactionHistory.sort(function (a, b) {
						return new Date(b.date) - new Date(a.date);
					})
				);
				setisLoading(false);
			})
			.catch((err) => {
			

				console.log(err);
				setisLoading(false);
			});
	}, []);
	return (
		<>
			<div className='tabular text-black'>
				<div className=' mx-auto px-4 sm:px-8 ' >
					<div className='py-8 '>
						<div className='sm:flex sm:justify-between'>
							<h2 className='text-2xl font-semibold text-left leading-tight mb-4 underline flex '>
								<button
									className=' text-black  pr-3'
									onClick={() => history.goBack()}>
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
								Transaction History{' '}
							</h2>
							<div className='buttons mx-auto sm:mx-0 flex justify-between w-48 my-6 sm:my-0 '>
								<button
									className={`px-3 h-8 sm:h-auto sm:py-2 focus:outline-none bg-transparent  border-primary ${
										chart ? '' : 'border-b-2'
									}`}
									onClick={() => {
										
										setchart(false);
									}}>
									Tabular
								</button>
								<button
									className={`px-3 h-8 sm:h-auto sm:py-2 focus:outline-none bg-transparent  border-primary ${
										chart ? 'border-b-2' : ''
									}`}
									onClick={() => setchart(true)}>
									Line Chart
								</button>
							</div>
						</div>
						<AnimatePresence exitBeforeEnter>
							{isLoading ? (
								<Loading />
							) : (
								<div className='fookin-history text-black'>
									{chart ? (
										<Chart transactions={TransactionHistory} />
									) : (
										<Tabular transactions={TransactionHistory} />
									)}
								</div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</>
	);
};

export default ViewHistory;

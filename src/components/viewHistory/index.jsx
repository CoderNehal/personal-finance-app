import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './index.scss';
import cookie from 'js-cookie';
import Chart from './Chart';
import Tabular from './Tabular';
import Loading from '../Loading';
import { AnimatePresence } from 'framer-motion';
const ViewHistory = () => {
	const [TransactionHistory, setTransactionHistory] = useState(null);
	const [chart, setchart] = useState(false);
	const [isLoading, setisLoading] = useState(false);
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
				console.log(res.data.TransactionHistory);
				setTransactionHistory(
					res.data.TransactionHistory.sort(function (a, b) {
						return new Date(b.date) - new Date(a.date);
					})
				);
				setisLoading(false);
			})
			.catch((err) => {
				console.log(TransactionHistory);

				console.log(err);
				setisLoading(false);
			});
	}, []);
	return (
		<>
			<div className='tabular text-black'>
				<div className='container mx-auto px-4 sm:px-8'>
					<div className='py-8'>
						<div className='sm:flex sm:justify-between'>
							<h2 className='text-2xl font-semibold text-left leading-tight mb-4 underline'>
								Transaction History{' '}
							</h2>
							<div className='buttons mx-auto sm:mx-0 flex justify-between w-48 my-6 sm:my-0 '>
								<button
									className={`px-3 h-8 sm:h-auto sm:py-2 focus:outline-none bg-transparent  border-primary ${
										chart ? '' : 'border-b-2'
									}`}
									onClick={() => {
										console.log('Tabular clicke');
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

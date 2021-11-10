import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './index.scss';
import cookie from 'js-cookie';
import Chart from './Chart';
import Tabular from './Tabular';
import Loading from '../Loading';
const ViewHistory = () => {
	const [TransactionHistory, setTransactionHistory] = useState(null);
	const [chart, setchart] = useState(false);
	const [isLoading, setisLoading] = useState(false);
	useEffect(() => {
		setisLoading(true);
		axios
			.get('https://finance-database-nehal.herokuapp.com/view-history', {
				params: {
					userId: cookie.get('userId'),
				},
				headers: {
					'content-type': 'application/json',
				},
			})
			.then((res) => {
				console.log(res.data.TransactionHistory);
				setTransactionHistory(res.data.TransactionHistory);
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
			{isLoading ? (
				<Loading />
			) : (
				<div className='fookin-history text-black'>
					{chart ? <Chart /> : <Tabular transactions={TransactionHistory} />}
				</div>
			)}
		</>
	);
};

export default ViewHistory;

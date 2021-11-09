import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './index.scss';
import cookie from 'js-cookie';
import Chart from './Chart';
import Tabular from './Tabular';
const ViewHistory = () => {
	const [TransactionHistory, setTransactionHistory] = useState(null);
	const [chart, setchart] = useState(false);
	useEffect(() => {
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
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	return (
		<div className='fookin-history text-black'>
			{chart ? <Chart /> : <Tabular transactions={TransactionHistory} />}
		</div>
	);
};

export default ViewHistory;

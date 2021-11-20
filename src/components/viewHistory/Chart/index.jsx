import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

const Chart = ({ transactions }) => {
	const [datasetForSpent, setdatasetForSpent] = useState([]);

	// 2000, 3000, 950, 800, 3000, 5000, 2000, 3000, 1150, 200, 3000,

	useEffect(() => {
		const arr = [];
		transactions &&
			transactions.forEach((transaction) => {
				if (transaction.type == 'debit') {
					const date = new Date(transaction.date);

					if (arr[date.getDate()] == null) {
						arr[date.getDate()] = transaction.spent;
					} else {
						arr[date.getDate()] += transaction.spent;
					}
				}
			});

		setdatasetForSpent(arr);
	}, []);

	
	const date = new Date();
	const today = date.getUTCDate();
	const labels = [];
	const indexesToBeZero = [];
	for (let i = 1; i <= Number(today); i++) {
		if (datasetForSpent[i]) {
			labels.push(i);
		}
	}

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Spent',
				data: datasetForSpent.filter((e) => e !== null),
				// data: datasetForSpent.map((e) => {
				// 	if (e == null) {
				// 		return 0;
				// 	} else {
				// 		console.log('Else executed', e);
				// 		return e;
				// 	}
				// }),

				fill: true,
				backgroundColor: 'rgba(148,42,136,0.2)',
				borderColor: 'rgba(148,42,136,1)',
			},
		],
	};

	return (
		<motion.div
			initial={{ x: '+50vw' }}
			animate={{ x: '0' }}
			exit={{ x: '+100vw' }}
			transition={{ duration: 0.3 }}
			className='chart'>
			<Line data={data} />
		</motion.div>
	);
};

export default Chart;

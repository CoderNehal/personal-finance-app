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

	// const data = {
	// 	labels: labels,
	// 	datasets: {
	// 		label: 'Days of fookin Month',
	// 		data: labels,
	// 	},
	// };

	const date = new Date();
	const today = date.getUTCDate();
	const labels = [];
	// let startDate = today;
	for (let i = 1; i < Number(today); i++) {
		// if (datasetForSpent[i]) {
		labels.push(i);

		// if (startDate == 1) {
		// 	startDate = 1;
		// } else {
		// 	startDate = i;
		// }
		// console.log(startDate);
		// } else {
		// for (let i = startDate; i <= datasetForSpent.length; i++) {
		// 	if (!datasetForSpent[i]) {
		// 		labels[i] = 0;
		// 	}
		// }
		// }
	}

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Spent',
				data: datasetForSpent,
				// data: datasetForSpent.map((e) => {
				// 	if (e == null) {
				// 		return 0;
				// 	} else {
				// 		console.log('Else executed', e);
				// 		return e;
				// 	}
				// }),
				fill: true,
				backgroundColor: 'rgba(75,192,192,0.2)',
				borderColor: 'rgba(75,192,192,1)',
			},
		],
	};

	return (
		<motion.div
			initial={{ x: '+100vw' }}
			animate={{ x: '0' }}
			exit={{ x: '+100vw' }}
			transition={{ duration: 0.3 }}
			className='chart'>
			<Line data={data} />
		</motion.div>
	);
};

export default Chart;

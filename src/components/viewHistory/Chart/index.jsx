import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
const Chart = ({ transactions }) => {
	const [datasetForSpent, setdatasetForSpent] = useState([
		2000, 3000, 950, 800, 3000, 5000, 2000, 3000, 1150, 200,
	]);
	useEffect(() => {
		const arr = [];
		transactions &&
			transactions.forEach((transaction) => {
				if (transaction.type == 'debit') {
					arr.push(transaction.spent);
				}
			});
		// setdatasetForSpent(arr);
		console.log(arr);
	}, []);
	const date = new Date();
	const today = date.getUTCDate();
	const labels = [];
	for (let i = 1; i <= Number(today); i++) {
		labels.push(i);
	}
	// const data = {
	// 	labels: labels,
	// 	datasets: {
	// 		label: 'Days of fookin Month',
	// 		data: labels,
	// 	},
	// };
	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Spent',
				data: datasetForSpent,
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
			{today.toString()}
			<Line data={data} />
		</motion.div>
	);
};

export default Chart;

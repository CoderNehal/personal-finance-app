import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import credit from '../../../images/credit1.png';
import debit from '../../../images/debit1.png';

import { motion } from 'framer-motion';

const Tabular = ({ transactions }) => {
	const [ShowMore, setShowMore] = useState(5);
	// const [transactionDetails, settransactionDetails] = useState({});

	return (
		<motion.div
			initial={{ x: '-50vw' }}
			animate={{ x: '0' }}
			transition={{ duration: 0.3 }}>
			{transactions === null ? (
				<h3>No Transaction found</h3>
			) : (
				<div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto '>
					<div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden'>
						<table className='min-w-full leading-normal'>
							<thead>
								<tr>
									<th className='pl-10  py-3 border-b-2 border-gray-200  bg-primary text-white text-center text-xs sm:text-base font-semibold uppercase tracking-wider '>
										Type
									</th>
									<th className='px-5 py-3 border-b-2 border-gray-200 bg-primary text-white text-center text-xs sm:text-base font-semibold uppercase tracking-wider'>
										Amount
									</th>
									<th className='px-5 py-3 border-b-2 border-gray-200 bg-primary text-white text-center text-xs sm:text-base font-semibold uppercase tracking-wider hidden sm:table-cell'>
										Added / Spent
									</th>
									<th className='px-5 py-3 border-b-2 border-gray-200 bg-primary text-white text-center text-xs sm:text-base font-semibold uppercase tracking-wider hidden sm:table-cell'>
										Source/Reason
									</th>
									<th className='px-5 py-3 border-b-2 border-gray-200 bg-primary text-white text-center text-xs sm:text-base font-semibold uppercase tracking-wider '>
										options
									</th>
								</tr>
							</thead>
							<tbody>
								{transactions &&
									transactions.slice(0, ShowMore).map((transaction) => {
										return (
											<tr className=' border-r-2 border-l-2 '>
												<td className=' px-3 py-5 border-b sm:text-base border-gray-200 bg-white text-sm'>
													<div className='flex justify-between items-center '>
														<div className=' w-10 h-10'>
															<img
																className='w-full h-full rounded-full'
																src={
																	transaction.type == 'credit' ? credit : debit
																}
																alt=''
															/>
														</div>
														<div className='text-center capitalize'>
															{transaction.type}
														</div>
														<div className='Empty'></div>
													</div>
												</td>
												<td className=' text-center px-3 py-5 border-b sm:text-lg border-gray-200 bg-white text-sm'>
													{transaction.added ? (
														<p className=' whitespace-no-wrap text-green'>
															+ ₹ {Number(transaction.added).toLocaleString()}
														</p>
													) : (
														<p className='whitespace-no-wrap text-red'>
															- ₹ {Number(transaction.spent).toLocaleString()}
														</p>
													)}
												</td>
												<td className=' text-center px-3 py-5 border-b sm:text-base border-gray-200 bg-white text-sm hidden sm:table-cell'>
													<p className='text-gray-900 whitespace-no-wrap'>
														{transaction.date}
													</p>
												</td>
												<td className=' text-center px-3 py-5 border-b sm:text-base border-gray-200 bg-white text-sm hidden sm:table-cell'>
													<span className='relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight'>
														<span
															aria-hidden
															className='absolute inset-0 bg-green-200 opacity-50 rounded-full'></span>
														<span className='relative'>
															{transaction.modeOfIncome ? (
																transaction.modeOfIncome
															) : (
																<>
																	{transaction.reason}
																	{transaction.other && (
																		<span className='text-xs text-gray-500 pl-2'>
																			({transaction.other})
																		</span>
																	)}
																</>
															)}
														</span>
													</span>
												</td>
												<td className=' text-center px-3 py-5 border-b sm:text-base border-gray-200 bg-white text-sm '>
													<Link
														to={{
															pathname: '/transaction-details',
															query: transaction,
														}}>
														<button
															type='button'
															className='inline-block bg-green text-white text-sm rounded  px-2 py-1 capitalize '>
															details
														</button>
													</Link>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
					{ShowMore <= transactions.length && (
						<div className='showMoreContainer w-full flex justify-center mt-3'>
							<button
								className='px-8 md:px-24 py-3 bg-primary text-white font-semibold text-lg md:text-xl text-center rounded '
								onClick={() => setShowMore(ShowMore + 5)}>
								Show More
							</button>
						</div>
					)}
				</div>
			)}
		</motion.div>
	);
};

export default Tabular;

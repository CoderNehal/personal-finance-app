import React, { useState } from 'react';
import credit from '../../../images/credit.png';
import debit from '../../../images/debit.png';
import dateFormat from 'dateformat';
import Modal from '../../Modal';
import { AnimatePresence } from 'framer-motion';
const Tabular = ({ transactions }) => {
	const [showModal, setshowModal] = useState(false);
	const [transactionDetails, settransactionDetails] = useState({});
	return (
		<div className='tabular text-black'>
			<div className='container mx-auto px-4 sm:px-8'>
				<div className='py-8'>
					<div>
						<h2 className='text-2xl font-semibold leading-tight mb-4 underline'>
							Transaction History{' '}
						</h2>
					</div>
					{transactions === null ? (
						<h3>No Transaction found</h3>
					) : (
						<div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
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
												opt.
											</th>
										</tr>
									</thead>
									<tbody>
										{transactions &&
											transactions.map((transaction) => {
												return (
													<tr>
														<td className=' px-3 py-5 border-b sm:text-base border-gray-200 bg-white text-sm'>
															<div className='flex justify-between items-center '>
																<div className=' w-10 h-10'>
																	<img
																		className='w-full h-full rounded-full'
																		src={
																			transaction.type == 'credit'
																				? credit
																				: debit
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
																	+ ₹{' '}
																	{Number(transaction.added).toLocaleString()}
																</p>
															) : (
																<p className='whitespace-no-wrap text-red'>
																	- ₹{' '}
																	{Number(transaction.spent).toLocaleString()}
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
															<button
																type='button'
																className='inline-block bg-green text-white text-sm rounded  px-2 py-1 capitalize '
																onClick={() => {
																	settransactionDetails(transaction);
																	setshowModal(true);
																}}>
																details
															</button>
														</td>
													</tr>
												);
											})}
									</tbody>
								</table>
							</div>
						</div>
					)}
				</div>
			</div>
			<AnimatePresence>
				{showModal && (
					<Modal
						data={transactionDetails}
						onShowModalChanged={() => setshowModal(false)}
					/>
				)}
			</AnimatePresence>
		</div>
	);
};

export default Tabular;

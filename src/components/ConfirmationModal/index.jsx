import { motion } from 'framer-motion';
import React from 'react';
import './index.scss';

const ConfirmationModal = ({
	Amount,
	closeModal,
	confirmTransaction,
	type,
}) => {
	return (
		<div className='confirmationModal absolute w-full -mt-24 md:mt-0  '>
			<div className='bg-black  opacity-25 w-full  absolute  z-10 inset-0 '></div>
			<motion.div
				initial={{ y: '-100vh' }}
				animate={{ y: 0 }}
				transition={{ duration: 0.7 }}
				exit={{ y: '-100vh' }}
				className='bg-white  absolute mt-60 mx-8  rounded-lg md:max-w-md md:mx-auto p-5  z-50   md:relative '>
				<div className=' '>
					<h3 className='text-lg font-semibold text-black'>
						Confirm Transaction
					</h3>
					<div className=' mt-2'>
						<p className='text-sm md:text-base text-gray-700 '>
							Do you wish to{' '}
							{type === 'spend' ? <span>spend</span> : <span>add</span>}
							<span
								className={`${type === 'spend' ? 'text-red' : 'text-green'} pl-2 pr-1`}>
								₹{Amount}
							</span>
							, press confirm to continue
						</p>
					</div>
					<div className='w-full flex justify-end items-center mt-4'>
						<button
							className='px-3 py-2 rounded-md bg-gray-200 text-black  font-semibold shadow-md text-sm border-gray-300 mr-2'
							onClick={closeModal}>
							Cancel
						</button>
						<button
							className={`px-3 py-2 rounded-md ${
								type === 'spend' ? 'bg-red' : 'bg-green'
							}  font-semibold shadow-md text-sm border-gray-300 mr-2`}
							onClick={() => {
								confirmTransaction();
								closeModal();
							}}>
							Confirm
						</button>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default ConfirmationModal;

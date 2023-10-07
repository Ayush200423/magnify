import * as React from 'react';
import { useContext } from 'react';
import { AccountContext } from '../../context/AccountContext';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';

export const AccountSummary = () => {

    const { accountData } = useContext(AccountContext)

    return (
        <div className='w-[280px] h-auto px-[20px] bg-[white]'>
            <div className='text-[15px] text-[gray] mt-[20px]'>
                Account Details
            </div>

            <div className='text-[20px] font-bold max-w-full overflow-hidden mt-[5px]'>
                {accountData?.email}
            </div>

            <div className='mt-[30px]'>
                <div className='text-[14px] font-black flex items-center mb-[5px]'>
                    <span className='mr-[10px]'>
                        <FontAwesomeIcon icon={faListUl}/>
                    </span>
                    <div>
                        Preview
                    </div>
                </div>
                <hr className='text-[#c8c8c8] mb-[20px]' />
            </div>

            <div className='text-[14px] mt-[10px]'>
                <div className='mb-[15px]'>
                    <div className='text-[gray]'>
                        Account Plan
                    </div>

                    <div className='mt-0'>
                        Magnify {accountData && accountData.plan ? accountData.plan.charAt(0).toUpperCase() + accountData.plan.slice(1).toLowerCase() : null}
                    </div>
                </div>

                <div className='mb-[15px]'>
                    <div className='text-[gray]'>
                        Products Remaining
                    </div>

                    <div className={`mt-0 ${accountData?.num_remaining_products == 0 ? 'text-[red]' : ''}`}>
                        {accountData?.num_remaining_products}/{accountData?.num_max_products}
                    </div>
                </div>

                <div className='mb-[15px]'>
                    <div className='text-[gray]'>
                        Next Update
                    </div>

                    <div className='mt-0'>
                        {accountData && accountData.next_update ? accountData.next_update.split('T')[0] : null}
                    </div>
                </div>

                <div className='mb-[15px]'>
                    <div className='text-[gray]'>
                        Website
                    </div>

                    <div className='mt-0'>
                        {accountData?.website ? accountData?.website : "No details"}
                    </div>
                </div>

                <div className='mt-[5px] text-[14px] mb-[20px]'>
                    <Link to='/account' className='text-[#1c78d5]'>Manage Account</Link>
                </div>
            </div>

        </div>
    );
}

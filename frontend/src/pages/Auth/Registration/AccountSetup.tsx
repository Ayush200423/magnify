import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../context/AuthContext';
import { useEditAccountFree } from '../../../hooks/useEditAccountFree';
import { LoginContext } from '../../../context/LoginContext';
import { PlanLayout } from '../../../components/Auth/PlanLayout';
import { Notice } from '../../../components/utils/Notice';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useLogin } from '../../../hooks/verify/useLogin';
import { SetupContext } from '../../../context/SetupContext';

export const AccountSetup = () => {
    const { logoutUser } = useContext(AuthContext)

    const { setDuration, handleOnClickFree } = useContext(SetupContext)

    const handleOnChangeDuration = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newDuration: string = e.target.value;
        setDuration(newDuration)
    }

    const [upgrade, setUpgrade] = useState<boolean>(false);

    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        if (query.get('upgrade')) {
            setUpgrade(true)
        }
    }, [upgrade])

    return (
        <div className='flex flex-col justify-start items-center'>
            <Link to={upgrade ? '/account' : '/'} onClick={upgrade ? null : logoutUser} className='absolute top-[25px] left-[25px]'>
                <FontAwesomeIcon icon={faArrowLeft} className='h-[20px] w-[20px]' color='#222d49' />
            </Link>

            <div className='text-[30px] mt-[70px] font-sans font-bold'>
                Pricing Plans
            </div>

            <div className='text-[18px] text-[#555555] mt-[10px] font-sans text-center'>
                Free for startups, flat pricing as you scale. Free for the first two months.
            </div>

            <div className='flex mt-[30px] py-[7px] px-[20px] bg-[#f4f5f6] rounded-lg items-center h-max'>
                <div className='text-[15px] text-[#2e323b] font-sans'>
                    Prices update every
                </div>
                <div>
                    <select className='ml-[2px] outline-none border-none bg-[#f4f5f6] text-[#2e323b] font-sans text-[15px]' onChange={handleOnChangeDuration}>
                        <option value="3">3 Days</option>
                        <option value="7">7 Days</option>
                        <option value="14">14 Days</option>
                        <option value="30" selected>30 Days</option>
                        <option value="60">60 Days</option>
                        <option value="120">120 Days</option>
                    </select>
                </div>
            </div>

            <div className='flex-col md:flex-row flex mt-[20px] flex-wrap'>
                <div className='mx-[10px] my-[10px]'>
                    <PlanLayout
                        plan_name='Starter'
                        plan_desc='For new startups just getting off the ground. No credit card required.'
                        handleOnClickFree={handleOnClickFree}
                        benefits={
                            [
                                {'text': 'Optimize up to 5 products', 'positive': false},
                                {'text': 'Serve prices to unlimited users', 'positive': true},
                                {'text': 'Automatic data collection', 'positive': true},
                                {'text': 'No credit card required', 'positive': true}
                            ]
                        }
                        homeStyle={false}
                    />
                </div>

                <div className='mx-[10px] my-[10px]'>
                    <PlanLayout
                        plan_name='Premium'
                        plan_desc='For brands that are starting to grow their number of products.'
                        cost={5}
                        monthly_api='PREMIUM_MONTHLY'
                        yearly_api='PREMIUM_YEARLY'
                        benefits={
                            [
                                {'text': 'Optimize up to 20 products', 'positive': true},
                                {'text': 'Serve prices to unlimited users', 'positive': true},
                                {'text': 'Automatic data collection', 'positive': true},
                            ]
                        }
                        homeStyle={false}
                    />
                </div>
                <div className='mx-[10px] my-[10px]'>
                    <PlanLayout
                        plan_name='Professional'
                        plan_desc='For brands growing their number of star products.'
                        cost={15}
                        monthly_api='PROFESSIONAL_MONTHLY'
                        yearly_api='PROFESSIONAL_YEARLY'
                        benefits={
                            [
                                {'text': 'Optimize up to 60 products', 'positive': true},
                                {'text': 'Serve prices to unlimited users', 'positive': true},
                                {'text': 'Automatic data collection', 'positive': true},
                            ]
                        }
                        homeStyle={false}
                    />
                </div>
                <div className='mx-[10px] my-[10px]'>
                    <PlanLayout
                        plan_name='Business'
                        plan_desc='For larger, established brands with many best-sellers.'
                        cost={50}
                        monthly_api='BUSINESS_MONTHLY'
                        yearly_api='BUSINESS_YEARLY'
                        benefits={
                            [
                                {'text': 'Optimize up to 200 products', 'positive': true},
                                {'text': 'Serve prices to unlimited visits', 'positive': true},
                                {'text': 'Automatic data collection', 'positive': true},
                            ]
                        }
                        homeStyle={false}
                    />
                </div>
            </div>
        </div>
    );
}
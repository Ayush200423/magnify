import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { AuthTextField } from '../../components/Auth/AuthTextField';
import { Notice } from '../../components/utils/Notice';
import { useContext, useState } from 'react';
import { LoginContext } from '../../context/LoginContext';
import { useResetPasswordEmail } from '../../hooks/email/useResetPasswordEmail';

export const ForgotPassword = () => {
    const [sent, setSent] = useState<boolean>(false);
    const [notice, setNotice] = useState<string>('');
    const { credentials } = useContext(LoginContext)
    
    const { mutate: emailMutate, isLoading: isLoadingEmail } = useResetPasswordEmail(setNotice, setSent)

    const handleOnClickEmail = () => {
        emailMutate(credentials);
    }

    return (
        <div>
            <div className='flex justify-center items-center w-[100vw] h-[100vh] bg-[#fcfcfc]'>
                <div className='w-[400px] h-auto shadow-2xl bg-[white] relative rounded-lg'>
                    <Link to="/login" className='absolute top-[25px] left-[25px]'>
                        <FontAwesomeIcon icon={faArrowLeft} className='h-[20px] w-[20px]' color='#222d49' />
                    </Link>


                    {sent ? 
                        <div className='w-[100%] h-[100%] flex flex-col justify-start items-center mt-[50px]'>
                            <img src={logo} alt="Magnify" className='w-[130px] h-auto' />

                            <div className='mt-[30px] mb-[5px] text-[22px] text-midnight'>
                                Email Sent!
                            </div>

                            <div className='mx-[20px] my-[10px] text-[14px] font-thin text-midnight text-center'>
                                Please check your inbox and spam folders for instructions to reset your password.
                            </div>

                            <div className={`flex justify-end w-[100%] mr-[45px]`}>
                                <Notice notice={notice} />
                            </div>

                            <div className='mt-[20px]'>
                                <AuthTextField type='email' placeholder='Email' label='Email' val={''} contextKey='email' />
                            </div>

                            <div className="mb-[20px]">
                                <button className='w-[300px] default-submit-btn-styling background-gradient' onClick={() => setSent(false)} >
                                    Resend Email
                                </button>
                            </div>
                        </div>

                        :

                        <div className='w-[100%] h-[100%] flex flex-col justify-start items-center mt-[50px]'>
                            <img src={logo} alt="Magnify" className='w-[130px] h-auto' />

                            <div className='mt-[30px] mb-[5px] text-[22px] text-midnight'>
                                Forgot Password
                            </div>

                            <div className='mx-[20px] my-[10px] text-[14px] font-thin text-midnight text-center'>
                                We'll send instructions to your email to reset your password.
                            </div>

                            <div className={`flex justify-end w-[100%] mr-[45px]`}>
                                <Notice notice={notice} />
                            </div>

                            <div className='mt-[20px]'>
                                <AuthTextField type='email' placeholder='Email' label='Email' val={''} contextKey='email' />
                            </div>

                            <div className="mb-[20px]">
                                <button className='w-[300px] default-submit-btn-styling background-gradient' onClick={handleOnClickEmail} disabled={isLoadingEmail} >
                                    {isLoadingEmail ? 'Sending Email...' : 'Send Email'}
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

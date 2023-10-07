import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Notice } from '../../../components/utils/Notice';
import logo from '../../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AuthContext from '../../../context/AuthContext';
import { useOTPEmail } from '../../../hooks/email/useOTPEmail';
import { useVerifyOTP } from '../../../hooks/verify/useVerifyOTP';
import { LoginContext } from '../../../context/LoginContext';
import VerifyContext from '../../../context/VerifyContext';
import { RegisterMap } from '../../../components/Auth/RegisterMap';

export const VerifyEmail = () => {

    const {setEmailSent, setNotice, notice, emailSent} = useContext(VerifyContext)
    const { logoutUser, authTokens } = useContext(AuthContext)
    const { credentials } = useContext(LoginContext)

    const [otp, setOTP] = useState<string>('')

    const { mutate: emailMutate, isLoading: isLoadingEmail } = useOTPEmail(setEmailSent, setNotice)
    const { mutate: verifyMutate, isLoading: isLoadingVerify } = useVerifyOTP(setEmailSent, setNotice)

    const handleOnClickResend = () => {
        emailMutate(authTokens?.access!);
    }

    const handleOnClickVerify = () => {
        verifyMutate({
            'access': authTokens?.access!,
            'temporary_token': otp,
            'credentials': credentials
        }
        );
    }

    const changeOTP = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLTextAreaElement;
        const val = target.value
        setOTP(val)
    }

    return (
        <div className='flex justify-center items-center w-[100vw] h-[100vh] bg-[#fcfcfc]'>
            <div className='w-[400px] h-auto shadow-2xl bg-[white] relative rounded-lg'>
                <Link to="/" onClick={logoutUser} className='absolute top-[25px] left-[25px]'>
                    <FontAwesomeIcon icon={faArrowLeft} className='h-[20px] w-[20px]' color='#222d49' />
                </Link>

                <div className='absolute top-[25px] right-[25px]'>
                    <RegisterMap selected={1} />
                </div>

                <div className='w-[100%] h-[100%] flex flex-col justify-start items-center mt-[50px]'>
                    <img src={logo} alt="Magnify" className='w-[130px] h-auto' />

                    <div className='mt-[30px] mb-[5px] text-[22px] text-midnight'>
                        Verify Email
                    </div>

                    <div className='my-[10px] text-[14px] font-thin text-midnight text-center'>
                        Please check your email for your OTP (one time passcode).
                        <span>
                            <button className='ml-[5px] text-[#1c78d5]' onClick={handleOnClickResend}>
                                Resend Email
                            </button>
                        </span>
                    </div>

                    <div className={`${emailSent || isLoadingEmail ? "flex" : "hidden"} h-[13px] justify-end w-[100%] mr-[45px]`}>
                        <div className='text-[13px] text-[green]'>
                            {isLoadingEmail ?
                                "Sending Email..."
                                : 
                                "Email Sent"
                            }
                        </div> 
                    </div>

                    <div className={`${emailSent || isLoadingEmail ? "hidden" : "flex"} justify-end w-[100%] mr-[45px]`}>
                        <Notice notice={notice} />
                    </div>

                    <div className='mt-[20px]'>
                        <label>
                            <div className='text-[14px]'>
                            One Time Passcode
                            </div>
                            <input value={otp} onChange={changeOTP} type='text' placeholder='OTP' className={`w-[300px] px-[20px] transition-all py-[12px] mt-[6px] mb-[24px] rounded-[4px] box-border border-[2px] border-[#e5e5e5] outline-none focus:border-midnight inline-block text-[14px]`} />
                        </label>
                        
                    </div>

                    <div className="mb-[20px]">
                        <button className='w-[300px] default-submit-btn-styling background-gradient' onClick={ handleOnClickVerify } disabled={ isLoadingVerify } >
                            {isLoadingVerify ? "Verifying..." : "Verify"}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
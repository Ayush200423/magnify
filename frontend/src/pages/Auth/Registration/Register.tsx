import * as React from 'react';
import { useContext, useState } from 'react';
import { LoginContext } from '../../../context/LoginContext';
import { useRegistration } from '../../../hooks/verify/useRegistration';
import { AuthTextField } from '../../../components/Auth/AuthTextField';
import { Notice } from '../../../components/utils/Notice';
import logo from '../../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { RegisterMap } from '../../../components/Auth/RegisterMap';

export const Register = () => {

    const [notice, setNotice] = useState<string>('');
    const { credentials } = useContext(LoginContext)

    const [revealPassword, setRevealPassword] = useState<boolean>(false)
    const [revealPassword2, setRevealPassword2] = useState<boolean>(false)

    const { mutate: registerMutate, isLoading: isLoadingRegistration } = useRegistration(setNotice)

    const handleOnClickRegister = () => {
        registerMutate(credentials);
    }

    return (
        <div className='flex justify-center items-center w-[100vw] h-[100vh] bg-[#fcfcfc]'>
            <div className='w-[400px] h-auto shadow-2xl bg-[white] relative rounded-lg'>
                <Link to="/" className='absolute top-[25px] left-[25px]'>
                    <FontAwesomeIcon icon={faArrowLeft} className='h-[20px] w-[20px]' color='#222d49' />
                </Link>

                <div className='absolute top-[25px] right-[25px]'>
                    <RegisterMap selected={0} />
                </div>

                <div className='w-[100%] h-[100%] flex flex-col justify-start items-center mt-[50px]'>
                    <img src={logo} alt="Magnify" className='w-[130px] h-auto' />

                    <div className='mt-[30px] mb-[5px] text-[22px] text-midnight'>
                        Welcome
                    </div>

                    <div className='my-[10px] text-[14px] font-thin text-midnight text-center'>
                        Please sign up to continue to your dashboard.
                    </div>

                    <div className={`flex justify-end w-[100%] mr-[45px]`}>
                        <Notice notice={notice} />
                    </div>

                    <div className='mt-[20px]'>
                        <AuthTextField type='email' placeholder='Email' label='Email' val={credentials['email']} contextKey='email' />
                        
                        <div className="relative">
                            <AuthTextField type={revealPassword ? 'text' : 'password'} placeholder='Password' label='Password' val={credentials['password']} contextKey='password' />
                            <div className='absolute top-[40px] right-[20px]'>
                                <button onClick={() => setRevealPassword(!revealPassword)}>
                                    {revealPassword ? 
                                        <FontAwesomeIcon icon={faEyeSlash} style={{color: "#222d49",}} />
                                        :
                                        <FontAwesomeIcon icon={faEye} style={{color: "#222d49",}} />
                                    }
                                </button>
                            </div>
                        </div>

                        <div className="relative">
                            <AuthTextField type={revealPassword2 ? 'text' : 'password'} placeholder='Confirm Password' label='Confirm Password' val={credentials['password2']} contextKey='password2' />
                            <div className='absolute top-[40px] right-[20px]'>
                                <button onClick={() => setRevealPassword2(!revealPassword2)}>
                                    {revealPassword2 ? 
                                        <FontAwesomeIcon icon={faEyeSlash} style={{color: "#222d49",}} />
                                        :
                                        <FontAwesomeIcon icon={faEye} style={{color: "#222d49",}} />
                                    }
                                </button>
                            </div>
                        </div>
                        
                    </div>

                    <div className="mb-[10px]">
                        <button className='w-[300px] default-submit-btn-styling background-gradient' onClick={ handleOnClickRegister } disabled={ isLoadingRegistration } >
                            {isLoadingRegistration ? "Registering..." : "Register"}
                        </button>
                    </div>

                    <div className='mb-[20px] text-[14px] text-midnight'>
                        Already have an account?
                        <Link to="/login" className='ml-[5px] text-[#1c78d5]'>
                            Sign In
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}
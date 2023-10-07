import * as React from 'react';
import { useContext, useState } from 'react';
import { LoginContext } from '../../context/LoginContext';
import { useLogin } from '../../hooks/verify/useLogin';
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Notice } from '../../components/utils/Notice';
import { AuthTextField } from '../../components/Auth/AuthTextField';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

export const Login = () => {
    
    const [notice, setNotice] = useState<string>('');
    const { credentials } = useContext(LoginContext)

    const [revealPassword, setRevealPassword] = useState<boolean>(false)

    const { mutate: authenticateMutate, isLoading: isLoadingLogin } = useLogin(setNotice)

    const handleOnClickLogin = () => {
        authenticateMutate(credentials);
    }

    return (
        <div className='flex justify-center items-center w-[100vw] h-[100vh] bg-[#fcfcfc]'>
            <div className='w-[400px] h-auto shadow-2xl bg-[white] relative rounded-lg'>
                <Link to="/" className='absolute top-[25px] left-[25px]'>
                    <FontAwesomeIcon icon={faArrowLeft} className='h-[20px] w-[20px]' color='#222d49' />
                </Link>

                <div className='w-[100%] h-[100%] flex flex-col justify-start items-center mt-[50px]'>
                    <img src={logo} alt="Magnify" className='w-[130px] h-auto' />

                    <div className='mt-[30px] mb-[5px] text-[22px] text-midnight'>
                        Welcome
                    </div>

                    <div className='my-[10px] text-[14px] font-thin text-midnight text-center'>
                        Please log in to continue to your dashboard.
                    </div>

                    <div className={`flex justify-end w-[100%] mr-[45px]`}>
                        <Notice notice={notice} />
                    </div>

                    <div className='mt-[20px]'>
                        <AuthTextField type='email' placeholder='Email' label='Email' val={credentials['email']} contextKey='email' />
                        <div className='relative'>
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
                        
                    </div>

                    <div className="mb-[10px]">
                        <button className='w-[300px] default-submit-btn-styling background-gradient' onClick={ handleOnClickLogin } disabled={ isLoadingLogin } >
                            {isLoadingLogin ? "Signing in..." : "Sign In"}
                        </button>
                    </div>

                    <div className='mb-[10px] text-[14px] text-[#1c78d5]'>
                    <Link to="/reset-password">
                            Forgot Password?
                        </Link>
                    </div>

                    <div className='mb-[20px] text-[14px] text-midnight'>
                        Don't have an account?
                        <Link to="/register" className='ml-[5px] text-[#1c78d5]'>
                            Sign Up
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}

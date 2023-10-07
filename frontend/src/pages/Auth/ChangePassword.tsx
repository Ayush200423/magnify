import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import logo from '../../assets/logo.png'
import { AuthTextField } from '../../components/Auth/AuthTextField';
import { Notice } from '../../components/utils/Notice';
import { useContext, useState } from 'react';
import { LoginContext } from '../../context/LoginContext';
import { useCommitPasswords } from '../../hooks/useCommitPasswords';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';

export const ChangePassword = () => {
    const [notice, setNotice] = useState<string>('')
    const { id } = useParams()
    const { credentials } = useContext(LoginContext)

    const [revealPassword, setRevealPassword] = useState<boolean>(false)
    const [revealPassword2, setRevealPassword2] = useState<boolean>(false)
    
    const { mutate, isLoading } = useCommitPasswords(setNotice)

    const handleOnClickResetPassword = () => {
        credentials['temporary_token'] = id
        mutate(credentials);
    }

    return (
        <div>
            <div className='flex justify-center items-center w-[100vw] h-[100vh] bg-[#fcfcfc]'>
                <div className='w-[400px] h-auto shadow-2xl bg-[white] relative rounded-lg'>

                    <div className='w-[100%] h-[100%] flex flex-col justify-start items-center mt-[50px]'>
                        <img src={logo} alt="Magnify" className='w-[130px] h-auto' />

                        <div className='mt-[30px] mb-[5px] text-[22px] text-midnight'>
                            Reset Your Password
                        </div>

                        <div className='mx-[30px] my-[10px] text-[14px] font-thin text-midnight text-center'>
                            Don't worry though, we still have all of your saved data
                        </div>

                        <div className={`flex justify-end w-[100%] mr-[45px]`}>
                            <Notice notice={notice} />
                        </div>

                        <div className='mt-[20px]'>
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
                        </div>

                        <div className='mt-[20px]'>
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

                        <div className="mb-[20px]">
                            <button className='w-[300px] default-submit-btn-styling background-gradient' onClick={handleOnClickResetPassword} disabled={isLoading} >
                                {isLoading ? 'Resetting...' : 'Reset Password'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

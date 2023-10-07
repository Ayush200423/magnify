import * as React from 'react';
import { LoginContext } from '../../../context/LoginContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const GetStarted = () => {
  const { credentials, setCredentials } = useContext(LoginContext)
  const [emailVal, setEmailVal] = useState('')
  const navigate = useNavigate();

  const changeEmailVal = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const val = target.value
    setEmailVal(val)
  }

  const routeChange = () => {
      credentials['email'] = emailVal
      setCredentials(credentials);
      navigate('/register');
  }

  return (
    <div className="relative flex h-[60px] text-midnight text-[13px] md:text-[15px]">
      <input value={emailVal} placeholder="Enter your email" className='outline-none w-[300px] md:w-[500px] h-[60px] pl-[20px] rounded-3xl text-midnight shadow-xl' type='email' onChange={changeEmailVal} required/>
      <button className='justify-center absolute rounded-3xl md:w-[160px] w-[100px] h-[50px] right-0 m-[5px] ml-[35px] font-bold btn-gradient text-[white]' onClick={routeChange}>
          Get Started
      </button>
    </div>
  );
}

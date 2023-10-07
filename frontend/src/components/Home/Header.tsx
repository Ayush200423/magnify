import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import menu from '../../assets/menu.svg';
import close from '../../assets/close.svg';
import { ApiDocs } from '../utils/ApiDocs';
import { Redirect } from '../utils/Redirect';


export const Header = () => {

  const [toggled, setToggled] = useState(false);
  const navigate = useNavigate()

  return (
    <div className='h-[90px] flex items-center justify-between bg-[white] top-0 w-full shadow-sm'>
      <img src={logo} alt="Magnify" className='h-[35px] ml-[7vw] inline text-[15px] bg-[white] my-0'/>

      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        <li className='mx-[25px] my-0'>
          <button className={`p-1 no-underline inline text-[15px] text-midnight`} onClick={() => navigate('/login')}>Log In</button>
        </li>

        <li className='ml-[25px] mr-[7vw] my-0'>
          <ApiDocs />
        </li>
      </ul>

      {/* mobile view */}

      <div className="sm:hidden flex flex-1 justify-end items-center mr-[25px] z-20">
        <img 
          src={toggled ? close : menu}
          alt="menu"
          className='w-[28px] h-[28px] object-contain'
          onClick={() => setToggled((prev) => !prev)}
        />

        <div className={`${toggled ? 'flex' : 'hidden'} p-6 absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar bg-midnight`}>

          <ul className='list-none flex flex-col justify-end items-center flex-1'>
            <li className='mb-5'>
              <Redirect text='Log In' url='login' toggled={true} />
            </li>

            <li className='mb-1'>
              <ApiDocs />
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
}

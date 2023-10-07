import * as React from 'react';
import logo from '../../../assets/logo.png';


export const Footer = () => {
  return (
    <div className='w-[100vw] h-[125px] bg-[white] flex justify-evenly items-center flex-wrap'>
        <div>
          <img src={logo} alt="Magnify" className='h-[30px]' />
        </div>

        <div className='flex mx-[100px]'>
            <div className='mx-[20px] text-[14px]'>
                <a href="#">Instagram</a>
            </div>

            <div className='mx-[20px] text-[14px]'>
                <a href="#">Twitter</a>
            </div>

            <div className='mx-[20px] text-[14px]'>
                <a href="https://discord.gg/VAk7GU6QB6">Discord</a>
            </div>

            <div className='mx-[20px] text-[14px]'>
                <a href="#">Email</a>
            </div>
        </div>

        <div className='text-[14px]'>
            <a href="#">Privacy Policy</a>
        </div>

    </div>
  );
}

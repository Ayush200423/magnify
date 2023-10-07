import * as React from 'react';
import { GetStarted } from '../utils/GetStarted';
import { Bullet } from '../../utils/Bullet';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const AOS = require('aos')

export function EntryText () {
    useEffect(() => {
        AOS.init()
    }, [])

    return (
        <div className='h-[calc(100%-40px)] flex flex-col justify-center w-full'>
            <div className='w-full justify-center items-center flex flex-col h-min md:mt-0 mt-[50px]'>
            <div className='font-semibold text-midnight md:text-[68px] text-[54px] flex-1 text-center ss:leading-[85px] leading-[65px] md:w-full w-[70%]'>
                Setting the <span className='text-gradient'>Perfect <br className='hidden sm:block' /> Price</span> is Hard
            </div>
            <div className='ss:text-[17px] text-[17px] mt-[30px] md:mt-[45px] md:mb-0 mb-[10px] text-center text-midnight font-thin md:w-full w-[85%]'>
                Take home the extra profit you're already leaving behind
                {/* Generate additional profit using your own sales data */}
            </div>
            <div className='mt-[5px] text-[15px]'>
                <a href='#setup' className='text-[#1c78d5]'>Setup in 10 minutes</a>
            </div>

            <div className='mt-[20px] md:mt-[40px]'>
                <GetStarted />
            </div>

            <div className="mt-[35px] md:mt-[35px] flex flex-col md:flex-row items-start">
                <div data-aos-delay="0" data-aos="fade-up" className='md:mb-0 mb-[10px]'>
                    <Bullet content="Demand-based pricing" />
                </div>
                <div data-aos-delay="50" data-aos="fade-up" className='md:mb-0 mb-[10px]'>
                    <Bullet content="Automatic price updates" />
                </div>
                <div data-aos-delay="100" data-aos="fade-up">
                    <Bullet content="No credit card required" />
                </div>
            </div>
            </div>
        </div>
    );
}

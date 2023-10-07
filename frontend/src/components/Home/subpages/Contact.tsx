import * as React from 'react';
import { useEffect } from 'react';

export const Contact = () => {
    return (
        <div className='w-[400px] h-[300px] md:w-[700px] md:h-[450px] rounded-2xl flex flex-col items-center justify-center text-midnight md:ml-[0px] ml-[90px]'>
            <div className='text-[37px] font-bold mb-[20px]'>
                Have questions?
            </div>

            <div className='text-[16px] mb-[30px] text-center px-[30px]'>
            Let us know, we'll help you get set up from start to finish.
            </div>

            <div className='mt-[30px]'>
                <a href='mailto:magnifyhead@gmail.com' className='px-[20px] py-[9px] bg-midnight rounded-full text-[white] font-bold'>Contact us</a>
            </div>
        </div>
    );
}

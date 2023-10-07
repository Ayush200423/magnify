import * as React from 'react';

export function SpecialtyText () {
  return (
    <div className='md:w-[40vw] w-[100vw] md:p-[30px] p-[15px] text-midnight h-min overflow-hidden flex justify-center items-center flex-col'>
        <div className="text-[30px] md:text-[40px] font-black leading-[1.3] mb-[25px] md:text-left text-center">
            <span className='text-gradient'>Justify</span> every product's price change
        </div>

        <div className="text-[15px] md:text-[17px] leading-[1.7] md:text-left text-center">
          Base your prices on your own customer interactions, not only on intuition or competitors.
        </div>
        
        <div className="text-[15px] md:text-[17px] leading-[1.7] md:text-left text-center mt-[20px]">
          We know every store is different, and some products sell more than others. That's why
          we evaluate each product from every store separately.
        </div>

        <div className='flex w-[100%] md:justify-start justify-center mt-[25px]'>
            <a href='#setup' className='text-[#1c78d5]'>Learn more about how it works.</a>
        </div>
    </div>
  );
}

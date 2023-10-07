import * as React from 'react';

export interface Props {
    icon: React.ReactNode,
    title: string,
    value: number
}

export function StatValue (props: Props) {
  return (
    <div className='flex flex-col justify-center items-start rounded-3xl h-min w-[400px] px-[20px] border-[1px] border-solid glowing-border'>
        
        <div className='mt-[18px] mb-[13px] mx-[7px]'>
            {props.icon}
        </div>

        <div className='text-[14px] mb-[2px] text-[white] font-black'>
            {props.title}
        </div>

        <div className='text-[30px] text-[#cbd5e1] mb-[8px]'>
            ${props.value}
        </div>
    </div>
  );
}

import * as React from 'react';

export interface Props {
    num: string,
    description: string,
    context: string,
    postIcon: React.ReactNode,
    directionIcon: React.ReactNode,
    bgColor: 'bg-[#e6f6fa]' | 'bg-[#ffeee3]' | 'bg-[#eefdef]'
}

export function StatsBubble (props: Props) {
  return (
    <div className={`w-[215px] h-[135px] ${props.bgColor} rounded-2xl items-center flex flex-col justify-center shadow-xl`}>

      <div className="relative top-0 right-[-75px]">
        { props.directionIcon }
      </div>

      <div className="flex items-center justify-evenly w-[100%]">
        <div>
          { props.postIcon }
        </div>
        <div className='flex flex-col items-end mr-[10px]'>
          <div className="text-[25px] font-black">
            { props.num }
          </div>
          <div className="text-[13px] font-black">
            { props.description }
          </div>
        </div>
      </div>

      <div className="text-[12px] mt-[10px] text-[#6e6e6e] flex flex-end">
        { props.context }
      </div>

    </div>
  );
}

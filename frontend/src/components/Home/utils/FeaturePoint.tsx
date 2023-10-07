import * as React from 'react';

export interface Props {
    text: string
    icon: React.ReactNode,
}

export function FeaturePoint (props: Props) {
  return (
    <div className='flex items-center background-gradient mx-[0px] p-[10px] rounded-md'>
        <div className='ml-[5px]'>
            { props.icon }
        </div>

        <div className="text-[14px] text-[white] ml-[15px]">
            { props.text }
        </div>
    </div>
  );
}

import { faCheckDouble } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export interface Props {
  text: string,
  positive: boolean
}

export function BulletPointFeature (props: Props) {
  return (
    <div className='flex items-center w-[250px] text-start relative'>
      <div className='h-[18px] mr-[8px] absolute top-[-1px]'>
        <FontAwesomeIcon icon={faCheckDouble} style={{color: `${props.positive ? "green" : "gray"}`, height: "16px"}} />
      </div>

      <div className="text-[13px] text-midnight ml-[20px] font-sans">
        { props.text }
      </div>
    </div>
  );
}

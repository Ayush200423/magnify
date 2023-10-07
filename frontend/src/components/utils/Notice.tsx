import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export interface Props {
    notice: string
}

export function Notice (props: Props) {
  return (
    <div className={`text-[13px] h-[13px] text-[red] ${props.notice ? 'flex' : 'hidden'}`}>
      <div>
        <FontAwesomeIcon icon={faCircleExclamation} style={{color: "#ff0000",}} size='lg' />
      </div>
        
      <div className='ml-[8px]'>
        {props.notice}
      </div>
    </div>
  );
}

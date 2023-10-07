import * as React from 'react';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
    content: string,
}

export const Bullet = (props: Props) => {
  return (
    <div className='flex items-center justify-center w-max'>
        <FontAwesomeIcon icon={faSquareCheck} style={{color: "#008000",}} className='mx-[12px]'/>
        <div className='text-[14px]'>{props.content}</div>
    </div>
  );
}

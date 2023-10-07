import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export interface Props {
    color: string,
    icon: IconDefinition
}

export function StatsIcon (props: Props) {
  return (
    <div className={`h-[50px] w-[50px] rounded-full ${props.color} flex justify-center items-center`}>
      <FontAwesomeIcon icon={props.icon} style={{color: "#FFFFFF",}} className='w-[23px] h-[23px]'/>
    </div>
  );
}

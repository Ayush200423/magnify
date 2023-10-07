import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';

export interface Props {
  selected: number
}

export const RegisterMap = (props: Props) => {

  const total = 3

  return (
    <div className='flex'>
      {Array.from({ length: total }, (_, index) => {
        if (index == props.selected) {
          return <div><FontAwesomeIcon icon={faCircle} style={{color: "black", height: "11px", marginLeft: "7px"}} /></div>
        } else {
          return <div><FontAwesomeIcon icon={faCircle} style={{color: "gray", height: "11px", marginLeft: "7px"}} /></div>
        }
        
      })}
    </div>
  );
}

import * as React from 'react';

export interface Props {
  text: string,
  sm_width: number,
  lg_width: number
  background: string
}

export const SubmitButton = (props: Props) => {
  return (
    <div>
        <button className={`w-[${props.sm_width}px] default-submit-btn-styling ${props.background} sm:w-[${props.lg_width}px]`}>
          {props.text}
        </button>
    </div>
  );
}

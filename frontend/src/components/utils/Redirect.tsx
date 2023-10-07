import * as React from 'react';
import { Link } from 'react-router-dom';

export interface Props {
  text: string,
  url: string,
  toggled: boolean
}

export const Redirect = (props: Props) => {
  return (
    <div>
      <Link to={`${props.url}`} className={`p-1 no-underline inline text-[15px] ${props.toggled ? 'text-[white]' : 'text-midnight'}`}>{props.text}</Link>
    </div>
  );
}

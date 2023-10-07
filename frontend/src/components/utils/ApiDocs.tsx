import * as React from 'react';
import { Link } from 'react-router-dom';

export interface Props {
}

export const ApiDocs = (props: Props) => {
  return (
    <div>
      <Link to="/api" className='text-[white] p-4 no-underline bg-midnight rounded-3xl inline text-[15px]'>API Docs</Link>
    </div>
  );
}

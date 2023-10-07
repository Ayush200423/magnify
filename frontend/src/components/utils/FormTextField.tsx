import * as React from 'react';
import { Dispatch, SetStateAction, useState } from 'react';

export interface Props {
  placeholder: string,
  label: string,
  val: string,
  digitOnly?: boolean
  sm_width: number,
  lg_width: number,
  setValue: Dispatch<SetStateAction<string|null>>
}

export const FormTextField = (props: Props) => {
  const [input, setInput] = useState<string>(props.val);

  const onlyNumbers = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const val = target.value
    
    const regex: RegExp = /^[0-9]*\.?[0-9]*$/;
    if (val === '' || regex.test(val)) {
      setInput(val);
      props.setValue(val);
    }
  }

  const allText = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const val = target.value
    
    setInput(val)
    props.setValue(val);
  }

  return (
    <div>
      <label>
        <div className='text-[14px]'>
          {props.label}
        </div>
        <input value={input} onChange={props.digitOnly ? onlyNumbers : allText} type="text" id={props.label.toLowerCase()} placeholder={props.placeholder} className={`w-[${props.sm_width}px] px-[20px] py-[12px] mt-[8px] mb-[24px] rounded-md box-border border-[2px] border-[#e5e5e5] outline-none focus:border-midnight inline-block text-[14px] sm:w-[${props.lg_width}px]`} />
      </label>
    </div>
  );
}

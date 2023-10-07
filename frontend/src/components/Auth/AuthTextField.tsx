import * as React from 'react';
import { useState, useContext } from 'react';
import { LoginContext } from '../../context/LoginContext';

export interface Props {
  placeholder: string,
  label: string,
  val: string,
  contextKey: string,
  type: string
}

export const AuthTextField = (props: Props) => {
    const { credentials, setCredentials } = useContext(LoginContext)

    const [textVal, setVal] = useState<string>(credentials[props.contextKey]);

    const allText = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.target as HTMLTextAreaElement;
        const val = target.value
        
        if (props.contextKey == 'email') {
            credentials[props.contextKey] = val.toLowerCase()
        } else {
            credentials[props.contextKey] = val
        }
        setCredentials(credentials)
        setVal(val)
    }

    return (
        <div>
            <label>
                <div className='text-[14px]'>
                {props.label}
                </div>
                <input value={credentials[props.contextKey]} onChange={allText} type={props.type} placeholder={props.placeholder} className={`w-[300px] px-[20px] transition-all py-[12px] mt-[6px] mb-[24px] rounded-[4px] box-border border-[2px] border-[#e5e5e5] outline-none focus:border-midnight inline-block text-[14px]`} />
            </label>
        </div>
    );
}

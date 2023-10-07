import * as React from 'react';

export interface Props {
  options: string[],
  label: string,
  sm_width: number,
  lg_width: number,
  setValue: any,
  currentVal: string
}

export const SelectField = (props: Props) => {
  const handleOnChangeDuration = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDuration: string = e.target.value;
    props.setValue(newDuration)
  }

  return (
    <div>
      <label>
        <div className='text-[14px]'>
          {props.label}
        </div>
        <select onChange={handleOnChangeDuration} id={props.label.toLowerCase()} className={`w-[${props.sm_width}px] px-[20px] py-[12px] mt-[8px] rounded-md box-border border-[2px] border-[#e5e5e5] outline-none focus:border-midnight inline-block text-[13px] md:w-[${props.lg_width}px]`}>
            {
              props.options.map(option => {
                if (option == props.currentVal) {
                  return (<option value={option} key={option} selected>{option} Days</option>)
                } else {
                  return (<option value={option} key={option}>{option} Days</option>)
                }
              })
            }
        </select>
      </label>
    </div>
  );
}

import * as React from 'react';

export interface Props {
  content: {
    title_1: string,
    text_1: string,
    title_2: string,
    text_2: string,
    title_3: string,
    text_3: string,
    title_4: string,
    text_4: string
  },
  dark: boolean
}

export const SetupText = (props: Props) => {
  return (
    <div className='flex flex-col'>
      <div className='flex md:flex-row flex-col mb-[7px]'>

        <div className={`w-[250px] h-[250px] ${props.dark ? "stats-page-background text-[white]" : "bg-[white]"} md:mr-[7px] md:mb-[0px] mb-[7px] flex flex-col items-center px-[20px] rounded-md`} data-aos="fade-up" data-aos-delay="0">
          <div className={`text-[50px] font-thin mt-[20px] ${props.dark ? 'gold-text-gradient' : 'text-gradient'}`}>
            01
          </div>
          <div className='text-[17px] mt-[10px] text-center'>
            {props.content.title_1}
          </div>
          <div className='h-[100% - 90px] flex items-center justify-center'>
            <div className={`text-center text-[13px] mt-[20px] ${props.dark ? 'text-[#e7e7e7]' : 'text-[#545454]'}`}>
              {props.content.text_1}
            </div>
          </div>
        </div>

        <div className={`${props.dark ? "stats-page-background text-[white]" : "bg-[white]"} w-[250px] h-[250px] bg-[white] md:ml-[7px] flex flex-col items-center px-[20px] md:mt-[0px] mt-[7px] rounded-md`} data-aos="fade-up" data-aos-delay="75">
          <div className={`text-[50px] font-thin mt-[20px] ${props.dark ? 'gold-text-gradient' : 'text-gradient'}`}>
            02
          </div>
          <div className='text-[17px] mt-[10px] text-center'>
            {props.content.title_2}
          </div>
          <div className='h-[100% - 90px] flex items-center justify-center'>
            <div className={`text-center text-[13px] mt-[20px] ${props.dark ? 'text-[#e7e7e7]' : 'text-[#545454]'}`}>
              {props.content.text_2}
            </div>
          </div>
        </div>

      </div>

      <div className='flex md:flex-row flex-col mt-[7px]'>

        <div className={`${props.dark ? "stats-page-background text-[white]" : "bg-[white]"} w-[250px] h-[250px] bg-[white] md:mr-[7px] flex flex-col items-center px-[20px] md:mb-[0px] mb-[7px] rounded-md`} data-aos="fade-up" data-aos-delay="150">
          <div className={`text-[50px] font-thin mt-[20px] ${props.dark ? 'gold-text-gradient' : 'text-gradient'}`}>
            03
          </div>
          <div className='text-[17px] mt-[10px] text-center'>
            {props.content.title_3}
          </div>
          <div className='h-[100% - 90px] flex items-center justify-center'>
            <div className={`text-center text-[13px] mt-[20px] ${props.dark ? 'text-[#e7e7e7]' : 'text-[#545454]'}`}>
              {props.content.text_3}
            </div>
          </div>
        </div>

        <div className={`${props.dark ? "stats-page-background text-[white]" : "bg-[white]"} w-[250px] h-[250px] bg-[white] md:ml-[7px] flex flex-col items-center px-[20px] md:mt-[0px] mt-[7px] rounded-md`} data-aos="fade-up" data-aos-delay="225">
          <div className={`text-[50px] font-thin mt-[20px] ${props.dark ? 'gold-text-gradient' : 'text-gradient'}`}>
            04
          </div>
          <div className='text-[17px] mt-[10px] text-center'>
            {props.content.title_4}
          </div>
          <div className='h-[100% - 90px] flex items-center justify-center'>
            <div className={`text-center text-[13px] mt-[20px] ${props.dark ? 'text-[#e7e7e7]' : 'text-[#545454]'}`}>
              {props.content.text_4}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
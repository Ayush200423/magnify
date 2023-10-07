import * as React from 'react';
import airbnb from '../../../assets/company_logos/airbnb.png'
import amazon from '../../../assets/company_logos/amazon.png'
import disney from '../../../assets/company_logos/disney.png'
import google from '../../../assets/company_logos/google.png'
import lyft from '../../../assets/company_logos/lyft.png'
import uber from '../../../assets/company_logos/uber.png'

export function StatisticsInfo () {
    return (
        <div className='w-[80vw] h-max rounded-xl shadow-2xl overflow-hidden'>
            <div className='w-full h-max bg-[white] flex md:flex-row flex-col px-[30px] items-center pt-[40px]'>
                <div className='w-[55%]'>
                    <div className='md:ml-[30px] ml-[0px] md:mt-[0px] my-[25px]'>
                        <div className='text-[21px] text-[gray] flex md:items-start items-center flex-col'>
                            Over
                        </div>

                        <div className='flex items-center md:flex-row flex-col'>
                            <div className='text-[72px] text-gradient mr-[20px] font-black leading-none mb-[10px]'>
                                40%
                            </div>
                            <div className='w-[50%] text-[17px] font-thin text-[#575555] md:text-start text-center'>
                                price products based on <br /> <span className='text-[25px] text-[#444242]'>expected demand</span>
                            </div>
                        </div>
                    </div>

                    <div className='md:ml-[30px] ml-[0px] md:mt-[0px] my-[30px]'>
                        <div className='text-[21px] text-[gray] flex md:items-start items-center flex-col'>
                            Another
                        </div>

                        <div className='flex items-center md:flex-row flex-col'>
                            <div className='text-[72px] text-gradient mr-[20px] font-black leading-none mb-[10px]'>
                                40%
                            </div>
                            <div className='w-[50%] text-[17px] font-thin text-[#575555] md:text-start text-center'>
                                price products based on <br /> <span className='text-[25px] text-[#444242]'>competition</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='md:flex flex-col hidden h-full w-[45%] items-start justify-start'>
                    <div className='text-[17px] text-[#575555] flex md:items-center justify-end flex-col w-full items-center mb-[40px] text-center'>
                        Thousands of businesses are already using <br /> Dynamic Pricing
                    </div>

                    <div className='flex flex-col w-full items-center justify-between'>

                        <div className='flex flex-row w-full justify-evenly items-center mb-[20px]'>
                            <img src={lyft} alt="Amazon" className='h-[50px] object-contain w-[130px] ' />
                            <img src={uber} alt="Uber" className='h-[50px] object-contain w-[100px] ' />
                            <img src={disney} alt="Disney" className='h-[50px] object-contain w-[130px] ' />
                        </div>

                        <div className='flex flex-row w-full justify-evenly items-center mt-[20px]'>
                            <img src={google} alt="Google" className='h-[50px] object-contain w-[130px] ' />
                            <img src={amazon} alt="Lyft" className='h-[50px] object-contain w-[130px] ' />
                        </div>

                    </div>

                </div>
            </div>


            <div className='w-full h-max stats-page-background  flex justify-center text-[16px]'>
                <div className='text-[white] py-[25px] ml-[30px]'>
                    With Magnify, set price ranges based on competitor pricing, and let your sales dynamically optimize them.
                </div>
            </div>
        </div>
    );
}

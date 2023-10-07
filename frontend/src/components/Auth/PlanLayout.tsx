import * as React from 'react';
import { PurchaseButton } from './utils/PurchaseButton';
import { BulletPointFeature } from './utils/BulletPointFeature';
import { useNavigate } from 'react-router-dom';

export interface Props {
    plan_name: string,
    plan_desc: string,
    cost?: number,
    handleOnClickFree?: any,
    monthly_api?: string,
    yearly_api?: string,
    benefits: {
        text: string,
        positive: boolean
    }[],
    homeStyle: boolean
}

export const PlanLayout = (props: Props) => {
    const navigate = useNavigate()

    const handleOnClickContinueHomePage = () => {
        navigate('/register')
    }

    return (
        <div className='w-[300px] h-[450px] border-solid border-[#e3e3e3] border-[1px] rounded-lg overflow-hidden bg-[white]'>
            <div className='ml-[15px] mt-[20px] text-midnight font-bold text-[17px]'>
                {props.plan_name}
            </div>

            <div className='ml-[15px] text-[13px] text-[gray] mt-[15px] mr-[10px]'>
                {props.plan_desc}
            </div>

            <div className='ml-[15px] flex items-end w-[80px] h-[50px] mt-[10px]'>
                {props.cost ? 
                    <span>
                        <span className='text-[30px] font-bold text-midnight w-max'>
                            ${props.cost}
                        </span>
                        <span className='text-[14px] text-[gray] font-bold ml-[3px]'>
                            /mo.
                        </span>
                    </span>
                    :
                    <span className='text-[30px] font-bold text-midnight'>
                        Free
                    </span>
                }
            </div>

            <div className='w-full flex flex-col items-center'>
                {
                    props.homeStyle ?
                        <div>
                            <div className='mt-[15px]'>
                                <button onClick={handleOnClickContinueHomePage} className='w-[250px] px-[20px] py-[12px] rounded-md text-[white] font-medium text-[13px] background-gradient font-sans'>
                                    Continue
                                </button>
                            </div>
                        </div>
                        :
                        props.cost ?
                            <div>
                                <div className='mt-[15px]'>
                                    <PurchaseButton monthly={true} api={props.monthly_api!} />
                                </div>
                                <div className='mt-[15px]'>
                                    <PurchaseButton monthly={false} api={props.yearly_api!} />
                                </div>
                            </div>
                            :
                            <button className='w-[250px] px-[20px] py-[12px] rounded-md text-[white] font-medium text-[13px] background-gradient mt-[15px]' onClick={props.handleOnClickFree}> 
                                Continue to dashboard
                            </button>
                }
                
            </div>

            <div className='w-full flex justify-center my-[20px]'>
                <div className='w-[270px] border-[0.5px] border-solid border-[#e3e3e3]'></div>
            </div>

            <div className='ml-[15px] text-[13px] font-semibold text-midnight'>
                Features
            </div>

            <div className='ml-[15px]'>
                {props.benefits.map((val, _) => (
                    <div className='my-[10px]'>
                        <BulletPointFeature text={val.text} positive={val.positive} />
                    </div>
                ))}
            </div>
            
        </div>
    );
}

import * as React from 'react';
import { StatsBubble } from './utils/StatsBubble';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowUpRightDots, faAward, faCartShopping, faHandHoldingDollar, faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
import { StatsIcon } from './utils/StatsIcon';

export interface Props {
    statsData: {
        expected_profit: number,
        expected_revenue: number,
        expected_sold: number,
        most_profit: {
            name: string,
            id: string,
            profit: number
        },
        profit_difference: number,
        revenue_difference: number,
        sold_difference: number
    }
}

export function StatsSection (props: Props) {

    const {expected_profit, expected_revenue, expected_sold, most_profit, profit_difference, revenue_difference, sold_difference} = Object(props.statsData)

    return (
        <div>
            <div className="w-[1100px] justify-between hidden ml:flex sidebar">
                <StatsBubble num={`$${String(expected_profit)}`} description={"Expected Profit"} bgColor='bg-[#ffeee3]' postIcon={<StatsIcon color="bg-[#f15e00]" icon={faHandHoldingDollar}/>} context={`${Math.round(Math.abs(profit_difference))}% ${profit_difference > 0 ? 'increase' : 'decrease'} from last term`} directionIcon={<FontAwesomeIcon icon={faArrowUpRightDots} rotation={profit_difference < 0 ? 90 : undefined} style={{color: "#f15e00", height: "16px", width: "16px"}} />} />
                <StatsBubble num={String(expected_sold)} description={"Expected Sold"} bgColor='bg-[#eefdef]' postIcon={<StatsIcon color="bg-[#19db26]" icon={faCartShopping} />} context={`${Math.round(Math.abs(sold_difference))}% ${sold_difference > 0 ? 'increase' : 'decrease'} from last term`} directionIcon={<FontAwesomeIcon icon={faArrowUpRightDots} rotation={sold_difference < 0 ? 90 : undefined} style={{color: "#19db26", height: "16px", width: "16px"}} />} />
                <StatsBubble num={`$${String(expected_revenue)}`} description={"Expected Revenue"} bgColor='bg-[#e6f6fa]' postIcon={<StatsIcon color="bg-[#28a8c7]" icon={faMoneyCheckDollar} />} context={`${Math.round(Math.abs(revenue_difference))}% ${revenue_difference > 0 ? 'increase' : 'decrease'} from last term`} directionIcon={<FontAwesomeIcon icon={faArrowUpRightDots} rotation={revenue_difference < 0 ? 90 : undefined} style={{color: "#28a8c7", height: "16px", width: "16px"}} />} />

                <div className="w-[350px] h-[135px] bg-midnight text-[white] rounded-2xl items-center flex flex-col justify-center shadow-xl">
                    <div className="absolute top-[-15px] right-[-15px] bg-[white] rounded-full h-[50px] w-[50px] flex justify-center items-center outline-double">
                        <FontAwesomeIcon icon={faAward} style={{color: "#4f607d", height: "30px", width: "30px"}} />
                    </div>

                    <div className="text-[14px]">
                        BIGGEST <span className='text-[#FFD700]'>PROFIT</span> GENERATOR
                    </div>

                    <div className="text-[22px] font-black">
                        {most_profit?.name}
                    </div>
                    
                    <div className="text-[12px] text-[#bdbdbd] mt-[10px]">
                        ID: {most_profit?.id} 
                    <span>
                        <FontAwesomeIcon icon={faArrowRight} style={{color: "#FFD700", height: "12px", width: "12px", marginLeft: "6px", marginRight: "6px"}} />
                    </span>
                        Made you ${most_profit?.profit} in profit last term
                    </div>
                </div>
            </div>
        </div>
    );
}

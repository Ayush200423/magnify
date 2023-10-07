import * as React from 'react';
import { FeaturePoint } from '../utils/FeaturePoint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGaugeSimpleHigh, faGear, faShieldHalved, faSliders } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import 'aos/dist/aos.css';

const AOS = require('aos')

export function BrandText () {
  useEffect(() => {
    AOS.init()
  }, [])
  
  return (
    <div className='md:w-[40vw] w-[100vw] md:p-[30px] p-[15px] text-midnight h-min overflow-hidden flex justify-center items-center flex-col'>
      <div className="text-[30px] md:text-[40px] font-black leading-[1.3] mb-[25px] md:text-left text-center">Do you have your own <span className='text-gradient'>brand</span>?</div>
      <div className="text-[15px] md:text-[17px] leading-[1.7] md:text-left text-center">
        Our effective machine learning algorithm will optimize your prices
        automatically to make you the maximum profit possible, based
        on recent sales.

        <div className='my-[30px]'>
          <div data-aos-delay="0" data-aos='fade-up-left' className='mb-[15px]'>
            <FeaturePoint text='Set minimum and maxiumum prices' icon={<FontAwesomeIcon icon={faSliders} style={{color: "#FFFFFF",}} />} />
          </div>
            
          <div data-aos-delay="50" data-aos='fade-up-left' className='mb-[15px]'>
            <FeaturePoint text='Choose price update intervals' icon={<FontAwesomeIcon icon={faGear} style={{color: "#FFFFFF",}} />} />
          </div>

          <div data-aos-delay="100" data-aos='fade-up-left'>
            <FeaturePoint text='Optionally approve price changes before they go live' icon={<FontAwesomeIcon icon={faShieldHalved} style={{color: "#FFFFFF",}} />} />
          </div>
        </div>
      </div>
    </div>
  );
}

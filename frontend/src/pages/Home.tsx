import * as React from 'react';
import { Header } from '../components/Home/Header';
import { BrandText } from '../components/Home/subpages/BrandText';
import { StatisticsInfo } from '../components/Home/subpages/StatisticsInfo';
import sample from '../assets/sample.png'
import chart from '../assets/chart.svg';
import expensive from '../assets/expensive.png'
import cheap from '../assets/cheap.png'
import { useEffect } from 'react';
import 'aos/dist/aos.css';
import { EntryText } from '../components/Home/subpages/EntryText';
import { SpecialtyText } from '../components/Home/subpages/SpecialtyText';
import { SetupText } from '../components/Home/subpages/SetupText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { PlanLayout } from '../components/Auth/PlanLayout';
import { Footer } from '../components/Home/subpages/Footer';
import { Contact } from '../components/Home/subpages/Contact';
import { Offer } from '../components/Home/utils/Offer';

const AOS = require('aos')

export const Home = () => {
  useEffect(() => {
    AOS.init({once: "true"})
  }, [])

  return (
    <div className='overflow-x-hidden overflow-y-hidden max-w-[100vw] bg-[#f2f5f6]'>
      <Offer />

      <Header />
      
      {/* Hero */}
      <div className='flex flex-col md:flex-row w-[100vw] sm:py-16 py-6 md:h-[calc(100vh-90px)] h-max bg-[white]'>
        <div className='md:w-[50%] w-[100%]'>
          <EntryText />
        </div>
        <div className="w-[100%] md:w-[50%] items-center justify-center md:flex hidden" >
          <img src={sample} alt="Sample Image" className='h-[275px] md:h-[425px] block' />
        </div>
      </div>


      {/* Statistics */}
      <div className='md:relative h-[60vh] mb-[50px] hidden md:block'>
        <div className='h-[30%] bg-[white]'></div>
        <div className='h-[70%]'></div>

        <div className='flex absolute justify-center top-0 w-[100vw]'>
          <div id="learn-more">

            <div className='flex w-full justify-center'>
              <StatisticsInfo />
            </div>

          </div>
        </div>
        
      </div>
      


      <div>
        <hr className='md:hidden block my-[40px] mx-[30px]' />
      </div>



      {/* Do you have your own brand? */}
      <div className="flex md:flex-row flex-col w-[100vw] md:h-[80vh] h-max justify-evenly items-center">

        <div data-aos="fade-right">
          <div className='w-[100%] md:w-[40vw] items-center justify-center flex'>
            <img src={chart} alt="Process" className='h-max' />
          </div>
        </div>

        <div data-aos="fade-left" className='mt-0'>
          <BrandText />
        </div>
        
      </div>



      {/* Justify every product's price change */}
      <div className="flex md:flex-row flex-col-reverse justify-evenly items-center md:h-[80vh] h-[100vh] w-[100vw] md:mt-[0px] mt-[50px]">

        <div data-aos="fade-right" className='md:mt-0 mt-[10px]'>
          <SpecialtyText />
        </div>

        <div data-aos="fade-left">
          <div className='w-[100%] md:w-[40vw] items-center justify-center flex'>
            <div className='relative w-[100%] h-[100%]'>
              <img src={expensive} alt="" className='h-[350px] md:h-[500px] w-auto right-[-30px] static md:absolute z-[1]' />
              <img src={cheap} alt="" className='h-[385px] w-auto md:block hidden' />
            </div>
          </div>
        </div>
        
      </div>




      {/* Just kick back and watch the extra profits add up */}
      <div className="flex md:flex-row flex-col items-center justify-between px-[100px] md:min-h-[90vh] min-h-[100vh] w-[100vw] mt-[35px]" id="setup">

      <div className='md:hidden flex w-full justify-center text-[20px] text-midnight mb-[30px]'>
          Setup
        </div>

        <SetupText content={{
          title_1: "Sign Up / Log In",
          text_1: "Scroll down to view the pricing options.",
          title_2: "Add Products",
          text_2: "Tell us about each product, we'll use this information to make pricing decisions.",
          title_3: "Download Shopify App",
          text_3: "If you are using it for a custom website, please refer to the API Docs.",
          title_4: "Congratulations!",
          text_4: "You have successfully set up Magnify and we are ready to start optimizing your prices.",
        }} dark={false} />

        <div className='lg:flex items-center justify-center flex-col hidden'>
          <div className='flex items-center mb-[20px]'>
            <FontAwesomeIcon icon={faAngleLeft} style={{color: "#222d49", height: "25px", width: "25px"}} className='mr-[3px]' />
            <div className='text-[17px] text-midnight ml-[3px]'>
              Setup
            </div>
          </div>

          <div className='flex items-center mt-[20px]'>
            <div className='text-[17px] text-midnight mr-[3px]'>
              Process
            </div>
            <FontAwesomeIcon icon={faAngleRight} style={{color: "#222d49", height: "25px", width: "25px"}} className='ml-[3px]' />
          </div>

        </div>

        <div className='md:hidden flex w-full justify-center text-[20px] text-midnight mt-[70px] mb-[30px]'>
          Process
        </div>
        
        <SetupText content={{
          title_1: "Initalize sales data",
          text_1: "For the first few days, we will test out various prices to see how your products perform.",
          title_2: "Collect sales data",
          text_2: "After this testing period, we will automatically collect non-confidential sales data.",
          title_3: "Optimize periodically",
          text_3: "At every interval, we will use your data to adjust prices.",
          title_4: "Watch the profit pile up",
          text_4: "All of these steps are done automatically. Just watch the profits, they pile up quick!",
        }} dark={true} />
      </div>


      {/* Pricing */}
      <div className="flex flex-col w-[100vw] md:h-[80vh] h-max justify-evenly items-center mt-[35px]">
        <div className='text-[30px] md:text-[35px] mt-[70px] font-bold'>
            Pricing Plans
        </div>

        <div className='text-[18px] text-[#555555] mt-[10px] text-center px-[30px]'>
            Free for startups, flat pricing as you scale. Free for the first two months.
        </div>

        <div className='flex md:flex-row flex-col mt-[30px]'>
          <div className='mx-[10px] my-[10px]' data-aos='fade-up'>
            <PlanLayout
              plan_name='Starter'
              plan_desc='For new startups just getting off the ground. No credit card required.'
              benefits={
                  [
                      {'text': 'Optimize up to 5 products', 'positive': false},
                      {'text': 'Serve prices to unlimited users', 'positive': true},
                      {'text': 'Automatic data collection', 'positive': true},
                      {'text': 'No credit card required', 'positive': true}
                  ]
              }
              homeStyle={true}
            />
          </div>

          <div className='mx-[10px] my-[10px]' data-aos='fade-up'>
            <PlanLayout
              plan_name='Premium'
              plan_desc='For brands that are starting to grow their products.'
              cost={5}
              benefits={
                  [
                      {'text': 'Optimize up to 20 products', 'positive': true},
                      {'text': 'Serve prices to unlimited users', 'positive': true},
                      {'text': 'Automatic data collection', 'positive': true},
                  ]
              }
              homeStyle={true}
            />
          </div>

          <div className='mx-[10px] my-[10px]' data-aos='fade-up'>
            <PlanLayout
              plan_name='Professional'
              plan_desc='For brands growing their number of star products.'
              cost={15}
              benefits={
                  [
                      {'text': 'Optimize up to 60 products', 'positive': true},
                      {'text': 'Serve prices to unlimited users', 'positive': true},
                      {'text': 'Automatic data collection', 'positive': true},
                  ]
              }
              homeStyle={true}
            />
          </div>

          <div className='mx-[10px] my-[10px]' data-aos='fade-up'>
            <PlanLayout
              plan_name='Business'
              plan_desc='For larger, established brands with many best-sellers.'
              cost={50}
              benefits={
                  [
                      {'text': 'Optimize up to 200 products', 'positive': true},
                      {'text': 'Serve prices to unlimited visits', 'positive': true},
                      {'text': 'Automatic data collection', 'positive': true},
                  ]
              }
              homeStyle={true}
            />
          </div>
        </div>
      </div>



      {/* Contact */}
      <div className='flex w-[100vw] h-[50vh] justify-center items-center bg-[white] md:mt-[120px] mt-[60px] rounded-tl-full'>
        <Contact />
      </div>



      {/* Footer */}
      <Footer />

    </div>
  );
}

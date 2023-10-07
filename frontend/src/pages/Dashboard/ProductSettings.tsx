import * as React from 'react';
import { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faParachuteBox } from '@fortawesome/free-solid-svg-icons';
import { Table, AddProduct } from '../../components';
import { Header } from '../../components/Dashboard/Header';
import { useQuery } from '@tanstack/react-query';
import { getProducts, getStatistics } from '../../data/products';
import AuthContext from '../../context/AuthContext';
import { StatsSection } from '../../components/Dashboard/StatsSection';
import { useFreeAccountEffect } from '../../components/Dashboard/useFreeAccountEffect';
import { AccountSummary } from '../../components/Dashboard/AccountSummary';
import { ApproveChanges } from '../../components/Dashboard/utils/ApproveChanges';

export const ProductSettings = () => {

  useFreeAccountEffect()

  const { authTokens } = useContext(AuthContext)

  const access = authTokens?.access
  let productsExist = false

  const { isError: productsError, isLoading: productsLoading, data: productsData, isSuccess } = useQuery({
    queryKey: ["products", access!],
    queryFn: () => getProducts(access!)
  })

  if (isSuccess) {
    if (productsData.length !== 0) {
      productsExist = true
    }
  }

  const { isError: statsError, isLoading: statsLoading, data: statsData } = useQuery({
    queryKey: ["statistics", access!],
    queryFn: () => getStatistics(access!)
  })

  if (productsLoading || statsLoading) {
    return (
      <div>
        <Header />
        <div className='w-[100vw] h-[calc(100vh-90px)] flex justify-center items-center'>
          <h1>Loading your products...</h1>
        </div>
      </div>
    )
  }

  if (productsError) {
    return (
      <div>
        <Header />
        <div className='w-[100vw] h-[calc(100vh-90px)] flex justify-center items-center text-center'>
          <h1>
            Sorry, we encountered an error and were not able to fetch your products.
          </h1>
        </div>
      </div>
    )
  }

  return (
    <div>

      <Header />
 
      <div className='flex flex-1'>
        <div className={`${statsError || !statsData.profit_difference ? 'px-[35px]' : 'px-[20px]' } mt-[70px] sticky lg:flex flex-col hidden bg-[white] flex-1`}>
          <AccountSummary />
        </div>

        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-center sm:mr-[75px] mr-[25px] lg:ml-[0px] sm:ml-[75px] ml-[25px] my-[30px] mb-[0px] md:mb-[30px]">
            <div className={`text-[20px] md:text-[25px] font-black flex justify-start`}>
              Products Overview
            </div>
            {
              productsExist ? <AddProduct /> : null
            }
          </div>

          {
            statsError || !statsData.profit_difference ?
              null
              :
              <div className='mx-[0px] my-[35px]'>
                <StatsSection statsData={statsData} />
              </div> 
          }

          {
            productsData[0]?.staging_price ? <ApproveChanges /> : null
          }
          
          {
            productsExist ? 
              <div className='mr-[35px] flex-grow'>
                <Table names={productsData} />
              </div>
              :
              <div className='sidebar mt-[15vh]'>
                <div className='w-full text-center'>
                  <FontAwesomeIcon icon={faParachuteBox} style={{color: "#222d49", height: "150px", width: "150px"}} />
                </div>
                
                <div className='w-full flex flex-col items-center text-[15px] mt-[20px]'>
                  <div className='font-black text-[25px]'>No data found</div>
                  <div className='mt-[10px] text-center mx-[70px]'>You may want to add a few products using the "Add Product" button</div>
                  <div className='mt-[39px]'>
                    <AddProduct />
                  </div>
                </div>
              </div>
          }
        </div>
      </div>
    </div>
  );
}

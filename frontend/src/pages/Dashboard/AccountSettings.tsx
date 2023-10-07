import * as React from 'react';
import { Header } from '../../components/Dashboard/Header';
import { SelectField } from '../../components/Dashboard/utils/SelectField';
import { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useFreeAccountEffect } from '../../components/Dashboard/useFreeAccountEffect';
import { LoginContext } from '../../context/LoginContext';
import { API_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
import { Notice } from '../../components/utils/Notice';
import { AccountContext } from '../../context/AccountContext';

export function AccountSettings () {
  const navigate = useNavigate()
  const { accountData, isLoadingAccountData, isSuccessAccountData, refetchAccountData, mutateEditAccountSettings, isLoadingSave, notice } = useContext(AccountContext)
  const { authTokens } = useContext(AuthContext)
  const { setLoginState } = useContext(LoginContext)
  const [website, setWebsite] = useState<string|null>(null)
  const [approve, setApprove] = useState<boolean>(true)
  const [priceChangeLimit, setPriceChangeLimit] = useState<number>(100)
  const [duration, setDuration] = useState<string>("30")

  useFreeAccountEffect()

  useEffect(() => {
    if (isSuccessAccountData) {
      setWebsite(accountData.website)
      setPriceChangeLimit(accountData.price_change_limit)
      setApprove(accountData.approval_required)
      console.log(accountData.approval_required, 'approval')
      if (accountData.update_duration) {
        setDuration(accountData.update_duration.split(" ")[0])
      }
    }
  }, [isSuccessAccountData])

  const loadBillingPortal = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const response = await fetch(`${API_URL}/api/stripe/create-portal-session/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authTokens?.access}`
      }
    })

    const data = await response.json()
    window.location.href = data
  }

  const handleOnClickUpgradeAccount = () => {
    setLoginState(true)
    navigate('/setup-account/?upgrade=true')
  }

  const handleOnChangeWebsite = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const val = target.value
    
    setWebsite(val)
  }

  const handleOnChangeLimit = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const val = target.value
    
    setPriceChangeLimit(Number(val))
  }

  const handleOnClickCancel = () => {
    refetchAccountData().then(() => {
      setWebsite(accountData.website)
      setPriceChangeLimit(accountData.price_change_limit)
      setApprove(accountData.approval_required)
      setDuration(accountData.update_duration.split(" ")[0])
    })
  }

  const handleOnClickSave = async () => {
    await mutateEditAccountSettings({
      access: authTokens?.access!,
      update_duration: duration,
      website: website ? website : '',
      price_change_limit: priceChangeLimit,
      approval_required: approve
    })

    refetchAccountData()
  }

  const freeUser = (accountData?.plan == "FREE")

  return (
    <div className='overflow-x-hidden h-auto'>
      <div className='w-[100vw] h-[40vh] absolute bg-[#f3f4f7] z-[-1] bottom-0'></div>
      <Header />
      
      <div className="text-[20px] md:text-[25px] font-black w-full mt-[20px] mb-[10px] flex justify-start md:ml-[460px] ml-[40px]">Account Settings</div>
      <div className='w-full flex justify-center mt-[0px]'>

        <div className='w-[400px] md:w-[600px] h-max shadow-2xl bg-[white] rounded-md mb-[40px]'>

          <div className={`justify-center h-[30px] items-center w-[100vw] ${notice ? "flex" : "hidden"}`}>
            <Notice notice={notice} />
          </div>

          <div className='flex md:flex-row flex-col px-[60px] pt-[30px] pb-[30px] md:justify-between md:items-end justify-end items-center'>
            <label className='md:mb-[0px] mb-[10px]'>
              <div className='text-[14px] font-black'>
                Subscription
              </div>
              <input value={isLoadingAccountData ? "Loading..." : `Magnify ${accountData.plan ? accountData.plan.charAt(0).toUpperCase() + accountData.plan.slice(1).toLowerCase() : null}`} type="text" id={"plan"} readOnly className='w-[280px] md:w-[220px] px-[20px] py-[12px] mt-[8px] rounded-md border-[2px] border-[#d5d6d5] bg-[#eeeeee] text-[#909192] focus:outline-none inline-block text-[13px]' />
            </label>

            {freeUser ? 
              <div className='md:mt-[0px] mt-[10px]'>
                <button onClick={handleOnClickUpgradeAccount} className='text-[white] text-[13px] background-gradient w-[280px] md:w-[220px] px-[20px] py-[12px] rounded-md box-border focus:outline-none inline-block border-[2px] border-[black]'>
                  Upgrade Account
                </button>
              </div>
              :
              <form onClick={loadBillingPortal} className='md:mt-[0px] mt-[10px]'>
                <button type='submit' className='text-[white] text-[13px] background-gradient w-[280px] md:w-[220px] px-[20px] py-[12px] rounded-md box-border focus:outline-none inline-block border-[2px] border-[black]'>
                  Manage Billing and Plan
                </button>
              </form>
            }
          </div>
          
          <div className='w-full flex justify-center'>
            <label>
              <div className='text-[14px] font-black'>
                Website
              </div>
              <input value={website!} onChange={handleOnChangeWebsite} type="text" id={"website"} placeholder={isLoadingAccountData ? "Loading..." : "Website"} className={`w-[280px] px-[20px] py-[12px] mt-[8px] mb-[30px] rounded-md box-border border-[2px] border-[#e5e5e5] outline-none focus:border-midnight inline-block text-[13px] md:w-[480px]`} />
            </label>
          </div>

          <div className='w-full flex justify-center mb-[30px]'>
            <SelectField options={["3", "7", "14", "30", "60", "120"]} label={'Prices Update Every'} sm_width={280} lg_width={480} setValue={setDuration} currentVal={duration} />
          </div>

          <div className='w-full flex justify-center'>
            <label className='md:mb-[0px] mb-[10px]'>
              <div className='text-[14px] font-black'>
                Next Price Update
              </div>
              <input value={isLoadingAccountData ? "Loading..." : `${accountData.next_update ? accountData.next_update.split('T')[0] : null}, midnight`} type="text" id={"plan"} readOnly className='w-[280px] px-[20px] py-[12px] mt-[8px] mb-[30px] rounded-md border-[2px] border-[#d5d6d5] bg-[#eeeeee] text-[#909192] focus:outline-none inline-block text-[13px] md:w-[480px]' />
            </label>
          </div>

          <div className='mb-[30px]'>
            <label className='flex px-[60px] items-center'>
              <div className='text-[14px] font-black mr-[25px]'>
                Approve before making price changes
              </div>
              <input type="checkbox" onChange={(e) => setApprove(e.target.checked)} className='w-[20px] h-[20px]' checked={approve} />
            </label>
          </div>

          <div className='w-full flex justify-center px-[60px]'>
            <label>
              <div className='text-[14px] font-black flex flex-col'>
                Price Change Limit (%)
                <span className='text-[12px] text-[grey] mt-[5px]'>
                  For example, setting 10% means prices would never change by more than 10% of the price range. If you do not want to restrict this, set this value 100.
                </span>
              </div>
              <input value={priceChangeLimit} onChange={handleOnChangeLimit} type="number" id={"limit"} placeholder={isLoadingAccountData ? "Loading..." : "Price Change Limit"} className={`w-[280px] px-[20px] py-[12px] mt-[8px] mb-[30px] rounded-md box-border border-[2px] border-[#e5e5e5] outline-none focus:border-midnight inline-block text-[13px] md:w-[480px]`} />
            </label>
          </div>


          <div className='flex md:flex-row flex-col px-[60px] pb-[30px] md:justify-between md:items-end justify-end items-center'>
            <div className='md:mt-[0px] mt-[10px]'>
              <button onClick={handleOnClickCancel} className='text-midnight font-black text-[13px] bg-[#e9eaed] w-[280px] md:w-[220px] px-[20px] py-[12px] rounded-md box-border focus:outline-none inline-block'>
                Cancel
              </button>
            </div>

            <div className='md:mt-[0px] mt-[20px]'>
              <button disabled={isLoadingSave} onClick={handleOnClickSave} className='text-[white] font-black text-[13px] background-gradient w-[280px] md:w-[220px] px-[20px] py-[12px] rounded-md box-border focus:outline-none inline-block'>
                {isLoadingSave ? "Saving..." : "Save"}
              </button>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  );
}
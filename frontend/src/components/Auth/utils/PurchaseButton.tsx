import * as React from 'react';
import AuthContext from '../../../context/AuthContext';
import { useContext, useEffect } from 'react';
import { API_URL } from '../../../config';
import { SetupContext } from '../../../context/SetupContext';

export interface Props {
    monthly: boolean,
    api: string
}

export function PurchaseButton (props: Props) {

  const { authTokens } = useContext(AuthContext)
  const { handleOnClickFree } = useContext(SetupContext)


  const loadPayment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    handleOnClickFree()

    const response = await fetch(`${API_URL}/api/stripe/create-checkout-session/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${authTokens?.access}`
      },
      body: JSON.stringify({
        "lookup_key": props.api,
        "update_interval": ""
      })
    })

    const data = await response.json()
    window.location.href = data
  }

  return (
    <form onSubmit={loadPayment}>
      <button type='submit' className='w-[250px] px-[20px] py-[12px] rounded-md text-[white] font-medium text-[13px] background-gradient font-sans'>
        { props.monthly ? "Buy monthly" : "Buy yearly (15% discount)"}
      </button>
    </form>
  )
}

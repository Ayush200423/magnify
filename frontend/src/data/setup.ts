type AddUserProp = {
    email: string,
    password: string,
    password2: string
}

type VerifyOTPProp = {
    access: string,
    temporary_token: string
    credentials: AddUserProp
}

type setupFreeAccountProp = {
  access: string,
  update_duration: string,
  website: string,
  credentials: AddUserProp
}

type setAccountSettingsProp = {
  access: string,
  update_duration: string,
  website: string,
  price_change_limit: number,
  approval_required: boolean
}

export const emailOTP = async (access: string) => {
  const response = await fetch(`http://localhost:8000/accounts/verify-email/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access}`
    }
  });
    
  return response.json()
}
  
export const verifyOTP = async (data: VerifyOTPProp) => {
  const response = await fetch(`http://localhost:8000/accounts/verify-otp/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${data.access}`
    },
    body: JSON.stringify({'temporary_token': data.temporary_token})
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message)
  }
  
  return response.json()
}

export const setupFreeAccount = async (data: setupFreeAccountProp) => {
  const response = await fetch(`http://localhost:8000/accounts/edit/free/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${data.access}`
    },
    body: JSON.stringify({
      'update_duration': `${data.update_duration} 00:00:00`,
      'website': data.website
    })
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message)
  }
  
  return response.json()
}


export const setupAccountSettings = async (data: setAccountSettingsProp) => {
  const response = await fetch(`http://localhost:8000/accounts/edit/settings/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${data.access}`
    },
    body: JSON.stringify({
      'update_duration': `${data.update_duration} 00:00:00`,
      'website': data.website,
      'price_change_limit': data.price_change_limit,
      'approval_required': data.approval_required
    })
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message)
  }
  
  return response.json()
}
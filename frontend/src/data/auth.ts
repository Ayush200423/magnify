type AddUserProp = {
    email: string,
    password: string,
    password2: string
}

type LoginUserProp = {
    email: string,
    password: string
}

type InvokeResetPasswordProp = {
  email: string
}

type CommitPasswordProp = {
  password: string,
  password2: string
}

export const addUser = async (credentials: AddUserProp) => {
    const response = await fetch(`http://localhost:8000/accounts/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    })

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message)
    }

    return response.json();
}

export const authenticateUser = async (credentials: LoginUserProp) => {
    const response = await fetch(`http://localhost:8000/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      throw new Error('Authentication failed')
    }
    
    return response.json();
}

export const emailForgotPassword = async (credentials: InvokeResetPasswordProp) => {
  const response = await fetch(`http://localhost:8000/accounts/reset-password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message)
  }
  
  return response.json();
}

export const commitPasswords = async (credentials: CommitPasswordProp) => {
  const response = await fetch(`http://localhost:8000/accounts/commit-password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(credentials)
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message)
  }
  
  return response.json();
}
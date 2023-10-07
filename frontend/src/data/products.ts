interface accessType {
    access: string
}

interface createProductData extends accessType {
    name: string,
    min: number,
    max: number,
    cost: number,
    initial: number
}

interface deleteProductData extends accessType {
    id: string
}

interface editProductData extends accessType {
    name: string,
    min: number,
    max: number,
    cost: number,
    id: string,
    suggested: number | null
}

export const getProducts = async (access: string) => {
    const response = await fetch(`http://localhost:8000/api/products/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`
        }
    })

    const data = await response.json()
    return data
}

export const getStatistics = async (access: string) => {
    const response = await fetch(`http://localhost:8000/api/statistics/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access}`
        }
    })

    const data = await response.json()
    return data
}

export const addProduct = async (data: createProductData) => {
    const response = await fetch(`http://localhost:8000/api/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${data.access}`
      },
      body: JSON.stringify(
        {
            "name": data.name,
            "min_price": data.min,
            "max_price": data.max,
            "cost": data.cost,
            "initial": data.initial
        })
    })

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message)
    }

    return response.json();
}

export const editProduct = async (data: editProductData) => {
    const response = await fetch(`http://localhost:8000/api/products/${data.id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${data.access}`
      },
      body: JSON.stringify(
        {
            "name": data.name,
            "min_price": data.min,
            "max_price": data.max,
            "cost": data.cost,
            "staging_price": data.suggested
        })
    })

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message)
    }

    return response.json();
}

export const deleteProduct = async (data: deleteProductData) => {
    const response = await fetch(`http://localhost:8000/api/products/${data.id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${data.access}`
      }
    })

    if (!response.ok) {
      const message = await response.text();
      throw new Error(message)
    }

    return response.json();
}

export const approveChanges = async (access: string) => {
  const response = await fetch(`http://localhost:8000/api/prices/approve/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${access}`
    }
  })

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message)
  }

  return response.json();
}
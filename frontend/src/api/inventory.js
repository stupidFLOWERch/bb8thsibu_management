const API_BASE = import.meta.env.VITE_API_URL ?? ''

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.error || 'Request failed')
  }

  return data
}

// GET inventory
export function showInventory() {
  return request('/api/inventory/show-inventory', {
    method: 'GET',
  });
}

export function checkStock(orderId) {
  return request("/api/inventory/check", {
    method: "POST",
    body: JSON.stringify({ orderId })
  });
}

export function decreaseStock(orderItems) {
  return request("/api/inventory/decrease", {
    method: "POST",
    body: JSON.stringify({ orderItems })
  });
}



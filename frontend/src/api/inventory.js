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

// export function orderInventory() {
//     return request('/api/inventory/order-inventory', {
//       method: 'POST',
//       body: JSON.stringify({ number }),
//     })
//   }

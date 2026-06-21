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


export function listBoys() {
  return request('/api/members/listBoys', {
    method: 'GET',
  });
}

export function getMemberRanking(email) {
    return request('/api/members/get-rank', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

export function getMemberInfo(id) {
  return request('/api/members/get-info', {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
}

export function updateMemberInfo(id, formdata) {
  return request('/api/members/update', {
    method: 'POST',
    body: JSON.stringify({
      id,
      ...formdata
    }),
  });
}
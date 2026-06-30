const CHATBOT_API_BASE = import.meta.env.VITE_CHATBOT_API_URL ?? 'http://localhost:8000'

async function request(path, options = {}) {
  const response = await fetch(`${CHATBOT_API_BASE}${path}`, {
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

export function askChatbot(message, sessionId = null) {
    return request('/chat', {
      method: 'POST',
      body: JSON.stringify({
        message: message,
        session_id: sessionId,
      }),
    })
  }
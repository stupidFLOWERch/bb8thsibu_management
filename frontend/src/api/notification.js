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
  if (!response.ok) throw new Error(data.error || 'Request failed')
  return data
}

export function getNotifications(userId) {
  return request('/api/notification/get-notifications', {
    method: 'POST',
    body: JSON.stringify({ userId }),
  })
}

export function createNotification({ userId, title, message, category, audience }) {
  return request('/api/notification/create-notification', {
    method: 'POST',
    body: JSON.stringify({ user_id: userId, title, message, category, audience }),
  })
}

export function markNotificationRead({ userId, notificationId }) {
  return request('/api/notification/mark-notification-read', {
    method: 'POST',
    body: JSON.stringify({
      user_id: Number(userId),
      notification_id: Number(notificationId),
    }),
  })
}

// utils/cookie.ts

export const setClientCookie = (name: string, value: string, days = 1) => {
  if (typeof document === 'undefined') return

  const expires = new Date()
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000)
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`
}

export const getClientCookie = (name: string): string | null => {
  if (typeof document === 'undefined') return null

  const nameEQ = `${name}=`
  const ca = document.cookie.split(';')

  for (let c of ca) {
    while (c.charAt(0) === ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) === 0)
      return decodeURIComponent(c.substring(nameEQ.length, c.length))
  }

  return null
}

const decideBaseUri = () => {
  if (import.meta.env.VITE_NODE_ENV === 'test') {
    return 'http://localhost:8080'
  }
  if (import.meta.env.VITE_API_URL) {
    const urls = `${import.meta.env.VITE_API_URL}`.split(',')
    const url = urls[0]
    if (url) {
      if (url[url.length - 1] === '/') {
        return url.slice(0, url.length - 1)
      } else {
        return url
      }
    }
  }
  return ''
}

export const baseUri = decideBaseUri()

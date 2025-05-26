export const getPokemonId = (url: string) => {
  const parts = url.split('/').filter(Boolean)
  return parts[parts.length - 1]
}

export const getCurrentPage = (url: string) => {
  try {
    const u = new URL(url)
    const offset = parseInt(u.searchParams.get('offset') || '0', 10)
    return Math.floor(offset / 20) + 1
  } catch {
    return 1
  }
}

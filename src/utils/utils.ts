const url = new URL(window.location.href)

export const isOnProduction: () => boolean = (): boolean => {
  return url.hostname !== 'localhost'
}

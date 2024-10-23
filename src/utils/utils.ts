const url = new URL(window.location.href)

export const isOnProduction: () => boolean = (): boolean => {
  return url.hostname !== 'localhost'
}

export const convertDateToFr: (date: string) => string = (
  date: string,
): string => {
  const dateArray: string[] = date.split('-')
  const year: string = dateArray[0]
  const month: string = dateArray[1]
  const day: string = dateArray[2]

  return `${day}/${month}/${year}`
}

export const convertDateToEn: (date: string) => string = (
  date: string,
): string => {
  const dateArray: string[] = date.split('-')
  const year: string = dateArray[0]
  const month: string = dateArray[1]
  const day: string = dateArray[2]

  return `${year}/${month}/${day}`
}

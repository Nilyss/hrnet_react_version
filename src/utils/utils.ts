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

export const formatDateForAPI: (date: Date | null) => string = (
  date: Date | null
): string => {
  if (!date) {
    throw new Error('Date is null or undefined')
  }

  const year: number = date.getFullYear()
  const month: string = String(date.getMonth() + 1).padStart(2, '0')
  const day: string = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}
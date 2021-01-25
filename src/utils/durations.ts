export const arrayFromPTString = (ptString: string): (string | null)[] => {
  const [days] = ptString.match(/([0-9]{1,2}(?=D))/) || [null]
  const [hours] = ptString.match(/([0-9]{1,2}(?=H))/) || [days ? '0' : null]
  const [minutes] = ptString.match(/([0-9]{1,2}(?=M))/) || ['0']
  const [seconds] = ptString.match(/([0-9]{1,2}(?=S))/) || ['0']

  return [seconds, minutes, hours, days].filter(value => value !== null)
}

export const secondsFromPTStringArray = (ptStringArray: string[]): number => {
  return ptStringArray
    .map(string => Number(string))
    .reduce((acc, number, index) => {
      const multipliers = [1, 60, 60 * 60, 60 * 60 * 24] /* second, minute, hour, day */
      acc += number * multipliers[index]

      return acc 
    }, 0)
}

export const durationFromPTStringArray = (ptStringArray: string[]): string => {
  return ptStringArray
    .reverse()
    .map(string => string.padStart(2, '0'))
    .join(':')
}

export const durationFromSeconds = (totalSeconds: number): string => {
  const days = Math.floor(totalSeconds / 60 / 60 / 24) || null
  const hours = Math.floor(totalSeconds / 60 / 60 - (days || 0 * 24)) || (days ? 0 : null)
  const minutes = Math.floor(totalSeconds / 60 - (days || 0 * 60 * 24) - (hours || 0 * 60))
  const seconds = Math.floor(totalSeconds - (days || 0 * 60 * 60 * 24) - (hours || 0 * 60 * 60) - (minutes * 60))
  
  const duration = [days, hours, minutes, seconds]
    .filter(time => time !== null)
    .map(time => String(time).padStart(2, '0'))
    .join(':')

  return duration
}

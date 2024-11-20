// styles | icons
import './datePicker.scss'
import { CiCalendarDate } from "react-icons/ci";

// types
interface IDatePickerProps {
  selectedDate?: Date
  onDateChange: (date: Date) => void
  customStyle?: CSSProperties
}

// hooks | library
import { useState, CSSProperties, ReactElement, useEffect, useRef } from 'react'

// components
import Calendar from '../calendar/Calendar'

export default function DatePicker({
  selectedDate,
  onDateChange,
  customStyle,
}: Readonly<IDatePickerProps>): ReactElement {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currentDate, setCurrentDate] = useState<Date | undefined>(
    selectedDate || undefined,
  )
  const [placeholder, setPlaceholder] = useState<string>('')
  const calendarRef = useRef<HTMLDivElement | null>(null)

  const browserLanguage: string =
    navigator.languages && navigator.languages.length > 0
      ? navigator.languages[0]
      : navigator.language

  const toggleCalendar: () => void = (): void => setIsOpen(!isOpen)

  const handleDateClick: (date: Date | undefined) => void = (
    date: Date | undefined,
  ): void => {
    if (date) {
      onDateChange(date)
      setCurrentDate(date)
    } else {
      setCurrentDate(undefined)
    }
    setIsOpen(false)
  }

  useEffect((): void => {
    const exampleDate = new Date(1988, 9, 26)
    const formattedDate: string = new Intl.DateTimeFormat(
      browserLanguage,
    ).format(exampleDate)

    if (formattedDate.startsWith('26')) {
      setPlaceholder('DD/MM/YYYY')
    } else if (formattedDate.startsWith('10')) {
      setPlaceholder('MM/DD/YYYY')
    } else {
      setPlaceholder('YYYY/MM/DD')
    }
  }, [browserLanguage])

  useEffect((): (() => void) => {
    const handleClickOutside: (event: MouseEvent) => void = (
      event: MouseEvent,
    ): void => {
      event.preventDefault()
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div id={'NRDPL'} style={customStyle}>
      <input
        id={'NRDPLInput'}
        type={'text'}
        placeholder={placeholder}
        value={
          currentDate ? currentDate.toLocaleDateString(browserLanguage) : ''
        }
        onClick={toggleCalendar}
        readOnly
      />
      <CiCalendarDate className={'calendarIcon'} />
      {isOpen && (
        <div ref={calendarRef} className={'NRDPLCalendarContainer'}>
          <Calendar
            value={selectedDate}
            onDateSelect={handleDateClick}
            locale={browserLanguage}
          />
        </div>
      )}
    </div>
  )
}
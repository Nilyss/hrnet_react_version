// styles
import './calendar.scss'

// types
interface ICalendarProps {
  value?: Date
  selectedDate?: Date
  onDateSelect?: (date: Date | undefined) => void
  locale: string
  translations: { clear: string; today: string }
  customStyles?: CSSProperties
  minYear?: number
  maxYear?: number
}

// hooks | libraries
import {
  ReactElement,
  useState,
  CSSProperties,
  MouseEvent,
  ChangeEvent,
} from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { GoTriangleUp } from 'react-icons/go'

export default function Calendar({
  selectedDate,
  onDateSelect,
  locale,
  translations,
  customStyles,
  minYear = new Date().getFullYear() - 100, // default value
  maxYear = new Date().getFullYear() + 10, // default value
}: Readonly<ICalendarProps>): ReactElement {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())

  const generateDaysOfMonth: (date: Date) => Date[] = (date: Date): Date[] => {
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)
    const days = []
    for (let i: number = 1; i <= endOfMonth.getDate(); i++) {
      days.push(new Date(date.getFullYear(), date.getMonth(), i))
    }
    return days
  }

  const days: Date[] = generateDaysOfMonth(currentMonth)

  const getWeekStartDay: (local: string) => number = (
    locale: string,
  ): number => {
    const mondayFirstLocales: string[] = ['fr', 'de', 'es', 'it', 'pt']
    const browserLanguageCode: string = locale.split('-')[0]
    return mondayFirstLocales.some(
      (loc: string): boolean => loc === browserLanguageCode,
    )
      ? 1
      : 0 // return 1 for monday, 2 for sunday
  }

  const getWeekdayLetters: () => string[] = (): string[] => {
    const days: string[] = []
    const weekStartDay: number = getWeekStartDay(locale)
    for (let i: number = 0; i < 7; i++) {
      const date = new Date(2024, 0, 7 + i + weekStartDay)
      days.push(
        date.toLocaleDateString(locale, { weekday: 'short' }).substring(0, 3),
      )
    }
    return days
  }

  const startOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  )
  const startDayOfWeek: number =
    (startOfMonth.getDay() - getWeekStartDay(locale) + 7) % 7

  const months: string[] = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ]

  const years: number[] = Array.from(
    { length: maxYear - minYear + 1 },
    (_: unknown, i: number): number => minYear + i,
  )

  const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), Number(e.target.value), 1),
    )
  }

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    setCurrentMonth(
      new Date(Number(e.target.value), currentMonth.getMonth(), 1),
    )
  }

  return (
    <div id={'NRCalendar'} style={customStyles}>
      <div className={'NRCalendarWrapper'}>
        <div className={'arrowTargetInput'}>
          <GoTriangleUp className={'arrowTargetInputIcon'} />
        </div>
        <div className={'calendarHeader'}>
          <button
            onClick={(e: MouseEvent<HTMLButtonElement>): void => {
              e.preventDefault()
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() - 1,
                  1,
                ),
              )
            }}
          >
            <FaChevronLeft />
          </button>
          <select
            value={currentMonth.getMonth()}
            onChange={handleMonthChange}
            className="monthSelect"
          >
            {months.map(
              (month: string, index: number): ReactElement => (
                <option key={index} value={index}>
                  {month}
                </option>
              ),
            )}
          </select>
          <select
            value={currentMonth.getFullYear()}
            onChange={handleYearChange}
            className="yearSelect"
          >
            {years.map(
              (year: number): ReactElement => (
                <option key={year} value={year}>
                  {year}
                </option>
              ),
            )}
          </select>
          <button
            onClick={(e: MouseEvent<HTMLButtonElement>): void => {
              e.preventDefault()
              setCurrentMonth(
                new Date(
                  currentMonth.getFullYear(),
                  currentMonth.getMonth() + 1,
                  1,
                ),
              )
            }}
          >
            <FaChevronRight />
          </button>
        </div>

        <div className={'calendarBody'}>
          <div className={'calendarWeekdays'}>
            {getWeekdayLetters().map(
              (letter: string, index: number): ReactElement => (
                <div key={index} className={'weekdayHeader'}>
                  {letter}
                </div>
              ),
            )}
          </div>
          <div className={'calendarGrid'}>
            {Array.from({ length: startDayOfWeek }).map(
              (_: unknown, index: number): ReactElement => (
                <div
                  key={`empty-${index}`}
                  className={'calendarDay empty'}
                ></div>
              ),
            )}
            {days.map(
              (day: Date, index: number): ReactElement => (
                <button
                  key={index}
                  className={`calendarDay ${
                    selectedDate?.toDateString() === day.toDateString()
                      ? 'selected'
                      : ''
                  } ${day.getDay() === 0 || day.getDay() === 6 ? 'weekend' : ''}`}
                  onClick={(): void | undefined => onDateSelect?.(day)}
                >
                  {day.getDate()}
                </button>
              ),
            )}
          </div>
        </div>
        <div className={'calendarFooter'}>
          <div className={'buttonWrapper'}>
            <button onClick={(): void | undefined => onDateSelect?.(undefined)}>
              {translations.clear}
            </button>
            <button
              onClick={(): void | undefined => onDateSelect?.(new Date())}
            >
              {translations.today}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

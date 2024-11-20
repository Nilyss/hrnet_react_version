// styles
import './calendar.scss'

// types
interface ICalendarProps {
  value?: Date
  selectedDate?: Date
  onDateSelect?: (date: Date | undefined) => void
  locale: string
  customStyles?: CSSProperties
}

// hooks | libraries
import { ReactElement, useState, CSSProperties, MouseEvent } from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { GoTriangleUp } from 'react-icons/go'

export default function Calendar({
  selectedDate,
  onDateSelect,
  locale,
  customStyles,
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

  const getWeekStartDay: (local: string) => number = (locale: string): number => {
    const mondayFirstLocales: string[] = ['fr', 'de', 'es', 'it', 'pt'];
    const browserLanguageCode: string = locale.split('-')[0]
    return mondayFirstLocales.some(loc => loc === browserLanguageCode) ? 1 : 0; // return 1 for monday, 2 for sunday
  };

  const getWeekdayLetters: () => string[] = (): string[] => {
    const days: string[] = [];
    const weekStartDay: number = getWeekStartDay(locale);
    for (let i: number = 0; i < 7; i++) {
      const date = new Date(2024, 0, 7 + i + weekStartDay);
      days.push(
        date.toLocaleDateString(locale, { weekday: 'short' }).substring(0, 3)
      );
    }
    return days;
  };

  const startOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
  const startDayOfWeek: number = (startOfMonth.getDay() - getWeekStartDay(locale) + 7) % 7;

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
          <span className={'month'}>
            {currentMonth.toLocaleDateString(locale, {
              month: 'long',
              year: 'numeric',
            })}
          </span>
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
            {Array.from({ length: startDayOfWeek }).map((_: unknown, index: number): ReactElement => (
              <div key={`empty-${index}`} className={'calendarDay empty'}></div>
            ))}
            {days.map((day: Date, index: number): ReactElement => (
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
            ))}
          </div>
        </div>
        <div className={'calendarFooter'}>
          <div className={'buttonWrapper'}>
            <button onClick={(): void | undefined => onDateSelect?.(undefined)}>Clear</button>
            <button onClick={(): void | undefined => onDateSelect?.(new Date)}>Today</button>
          </div>
        </div>
      </div>
    </div>
  )
}

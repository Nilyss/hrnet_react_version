// styles
import './newEmployeeForm.scss'

// hooks | libraries
import { useContext, useEffect, ReactElement, useState } from 'react'
import Select from 'react-select'
import { useTranslation } from 'react-i18next'

// context
import { CountryStateContext } from '../../context/CountryStateContext.tsx'

// components
import DatePicker from '../datePicker/DatePicker.tsx'

export default function NewEmployeeForm(): ReactElement {
  const tabletBreakpoint: number = 1024
  const [isTablet, setIsTablet] = useState<boolean>(
    window.matchMedia(`(max-width: ${tabletBreakpoint}px`).matches,
  )

  const { countryStates, getCountryStates } = useContext(CountryStateContext)
  const { t } = useTranslation()

  const selectDepartmentOptions: { value: string; label: string }[] = [
    { value: 'Sales', label: t('sales') },
    { value: 'Marketing', label: t('marketing') },
    { value: 'Engineering', label: t('engineering') },
    { value: 'Human Resources', label: t('humanResources') },
    { value: 'Legal', label: t('legal') },
  ]

  const datePickerStyle: { width: string } = isTablet
    ? { width: '100%' }
    : { width: '75%' }

  useEffect((): void => {
    if (!countryStates) {
      getCountryStates()
    }
  }, [countryStates, getCountryStates])

  useEffect((): (() => void) => {
    const mediaQuery: MediaQueryList = window.matchMedia(
      `(max-width: ${tabletBreakpoint}px)`,
    )
    const handleResize: () => void = (): void => setIsTablet(mediaQuery.matches)

    mediaQuery.addEventListener('change', handleResize)
    return (): void => mediaQuery.removeEventListener('change', handleResize)
  }, [tabletBreakpoint])

  return (
    <>
      {countryStates && (
        <form id={'newEmployeeForm'}>
          <div className={'topSection'}>
            <div className={'leftSide'}>
              <h3>{t('civilInformation')}</h3>
              <div className={'inputWrapper'}>
                <label htmlFor={'firstName'}>{t('firstName')}</label>
                <input type={'text'} id={'firstName'} required />
              </div>
              <div className={'inputWrapper'}>
                <label htmlFor={'lastName'}>{t('lastName')}</label>
                <input type={'text'} id={'lastName'} required />
              </div>
              <div className={'inputWrapper'}>
                <label htmlFor={'dateOfBirth'}>{t('dateOfBirth')}</label>
                <DatePicker
                  onDateChange={(): void => {}}
                  customStyle={datePickerStyle}
                  minYear={1900}
                  maxYear={new Date().getFullYear()}
                />
              </div>
              <div className={'inputWrapper'}>
                <label htmlFor={'startDate'}>{t('startDate')}</label>
                <DatePicker
                  onDateChange={(): void => {}}
                  customStyle={datePickerStyle}
                  minYear={1998}
                  maxYear={new Date().getFullYear() + 1}
                />
              </div>
            </div>
            <div className={'rightSide'}>
              <h3>{t('address')}</h3>
              <div className={'inputWrapper'}>
                <label htmlFor={'street'}>{t('street')}</label>
                <input type={'text'} id={'street'} required />
              </div>
              <div className={'inputWrapper'}>
                <label htmlFor={'city'}>{t('city')}</label>
                <input type={'text'} id={'city'} required />
              </div>
              <div className={'inputWrapper'}>
                <label htmlFor={'state'}>{t('state')}</label>
                <Select id={'state'} options={countryStates} />
              </div>
              <div className={'inputWrapper'}>
                <label htmlFor={'zipCode'}>{t('zipCode')}</label>
                <input type={'text'} id={'zipCode'} required />
              </div>
            </div>
          </div>
          <div className={'bottomSection'}>
            <div className={'selectWrapper'}>
              <label htmlFor={'department'}>{t('department')}</label>
              <Select id={'department'} options={selectDepartmentOptions} />
            </div>
            <div className={'buttonWrapper'}>
              <button
                className={'buttonDisabled'}
                type={'submit'}
                disabled={true}
              >
                {t('save')}
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  )
}

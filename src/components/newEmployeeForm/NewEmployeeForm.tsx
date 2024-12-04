// styles
import './newEmployeeForm.scss'

// hooks | libraries
import {
  useContext,
  useEffect,
  ReactElement,
  useState,
  FormEvent,
  ChangeEvent,
} from 'react'
import Select, { SingleValue } from 'react-select'
import { useTranslation } from 'react-i18next'

// context
import { CountryStateContext } from '../../context/CountryStateContext.tsx'

// components
import DatePicker from '../datePicker/DatePicker.tsx'
import AlertModal from '../alertModal/AlertModal.tsx'
import { ICountryState } from '../../utils/interface/countryState.ts'

export default function NewEmployeeForm(): ReactElement {
  const tabletBreakpoint: number = 1024
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [dateOfBirth, setDateOfBirth] = useState<Date | null>(null)
  const [startDate, setStartDate] = useState<Date | null>(null)
  const [street, setStreet] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [zipCode, setZipCode] = useState<string>('')
  const [department, setDepartment] = useState<string>('')
  const [alertMessage, setAlertMessage] = useState<string>('')
  const [isSubmitEnabled, setIsSubmitEnabled] = useState<boolean>(false)
  const [isAlertDisplayed, setIsAlertDisplayed] = useState<boolean>(false)
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


  const handleSubmit: (e: FormEvent<HTMLFormElement>) => void = (
    e: FormEvent<HTMLFormElement>,
  ): void => {
    e.preventDefault()
    const formData = {
      firstName,
      lastName,
      dateOfBirth,
      startDate,
      street,
      city,
      state,
      zipCode,
      department,
    }

    console.log('formData =>', formData)

    const res = {
      status: 201,
    }

    if (res.status === 201) {
      setAlertMessage('New employee created successfully !')
    } else {
      setAlertMessage('Cannot create employee, try again later.')
    }
    setIsAlertDisplayed(true)
    setFirstName('')
    setLastName('')
    setDateOfBirth(null)
    setStartDate(null)
    setStreet('')
    setCity('')
    setState('')
    setZipCode('')
    setDepartment('')
  }

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

  useEffect((): void => {
    const isFilled: boolean =
      firstName.trim() !== '' &&
      lastName.trim() !== '' &&
      dateOfBirth !== null &&
      startDate !== null &&
      street.trim() !== '' &&
      city.trim() !== '' &&
      state.trim() !== '' &&
      zipCode.trim() !== '' &&
      department.trim() !== ''

    setIsSubmitEnabled(isFilled)
  }, [
    firstName,
    lastName,
    dateOfBirth,
    startDate,
    street,
    city,
    state,
    zipCode,
    department,
  ])

  return (
    <>
      {countryStates && (
        <form
          id={'newEmployeeForm'}
          onSubmit={(e: FormEvent<HTMLFormElement>): void => handleSubmit(e)}
        >
          {isAlertDisplayed && (
            <AlertModal
              props={{
                textAlert: alertMessage,
                setIsAlertOpen: setIsAlertDisplayed,
                isAlertOpen: isAlertDisplayed,
              }}
            />
          )}
          <div className={'topSection'}>
            <div className={'leftSide'}>
              <h3>{t('civilInformation')}</h3>
              <div className={'inputWrapper'}>
                <label htmlFor={'firstName'}>{t('firstName')}</label>
                <input
                  type={'text'}
                  id={'firstName'}
                  value={firstName}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                    setFirstName(e.target.value)
                  }
                  required
                />
              </div>
              <div className={'inputWrapper'}>
                <label htmlFor={'lastName'}>{t('lastName')}</label>
                <input
                  type={'text'}
                  id={'lastName'}
                  value={lastName}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                    setLastName(e.target.value)
                  }
                  required
                />
              </div>
              <div className={'inputWrapper'}>
                <label htmlFor={'dateOfBirth'}>{t('dateOfBirth')}</label>
                <DatePicker
                  onDateChange={(date: Date): void => setDateOfBirth(date)}
                  customStyle={datePickerStyle}
                  minYear={1900}
                  maxYear={new Date().getFullYear()}
                />
              </div>
              <div className={'inputWrapper'}>
                <label htmlFor={'startDate'}>{t('startDate')}</label>
                <DatePicker
                  onDateChange={(date: Date): void => setStartDate(date)}
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
                <input
                  type={'text'}
                  id={'street'}
                  value={street}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                    setStreet(e.target.value)
                  }
                  required
                />
              </div>
              <div className={'inputWrapper'}>
                <label htmlFor={'city'}>{t('city')}</label>
                <input
                  type={'text'}
                  id={'city'}
                  value={city}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                    setCity(e.target.value)
                  }
                  required
                />
              </div>
              <div className={'inputWrapper'}>
                <label htmlFor={'state'}>{t('state')}</label>
                <Select
                  id={'state'}
                  options={countryStates}
                  value={countryStates.find(
                    (s: ICountryState): boolean => s.value === state,
                  )}
                  onChange={(
                    selectedOption: SingleValue<ICountryState>,
                  ): void => setState(selectedOption?.value ?? '')}
                />
              </div>
              <div className={'inputWrapper'}>
                <label htmlFor={'zipCode'}>{t('zipCode')}</label>
                <input
                  type={'text'}
                  id={'zipCode'}
                  value={zipCode}
                  onChange={(e: ChangeEvent<HTMLInputElement>): void =>
                    setZipCode(e.target.value)
                  }
                  required
                />
              </div>
            </div>
          </div>
          <div className={'bottomSection'}>
            <div className={'selectWrapper'}>
              <label htmlFor={'department'}>{t('department')}</label>
              <Select
                id={'department'}
                options={selectDepartmentOptions}
                value={selectDepartmentOptions.find(
                  (option: { value: string; label: string }): boolean =>
                    option.value === department,
                )}
                onChange={(
                  selectedOption: SingleValue<{ value: string; label: string }>,
                ): void => setDepartment(selectedOption?.value ?? '')}
              />
            </div>
            <div className={'buttonWrapper'}>
              <button
                className={isSubmitEnabled ? 'buttonEnabled' : 'buttonDisabled'}
                type={'submit'}
                disabled={!isSubmitEnabled}
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

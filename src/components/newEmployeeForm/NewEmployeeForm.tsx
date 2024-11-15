// styles
import './newEmployeeForm.scss'

// hooks | libraries
import { useContext, useEffect, ReactElement } from 'react'
import Select from 'react-select'
import { useTranslation } from 'react-i18next'

// context
import { CountryStateContext } from '../../context/CountryStateContext.tsx'

// components
import DatePicker from '../datePicker/DatePicker.tsx'

export default function NewEmployeeForm(): ReactElement {
  const { countryStates, getCountryStates } = useContext(CountryStateContext)
  const { t } = useTranslation()

  useEffect(() => {
    if (!countryStates) {
      getCountryStates()
    }
  }, [])

  const selectDepartmentOptions = [
    { value: 'Sales', label: t('sales') },
    { value: 'Marketing', label: t('marketing') },
    { value: 'Engineering', label: t('engineering') },
    { value: 'Human Resources', label: t('humanResources') },
    { value: 'Legal', label: t('legal') },
  ]

  return (
    <>
      {countryStates && (
        <form id={'newEmployeeForm'}>
          <div className={'topSection'}>
            <div className={'leftSide'}>
              <h3>{t('civilInformation')}</h3>
              <div className={'inputWrapper'}>
                <label htmlFor={'firstName'}>{t('firstName')}</label>
                <input
                  type={'text'}
                  id={'firstName'}
                  placeholder={t('firstName')}
                  required
                />
              </div>
              <div className={'inputWrapper'}>
                <label htmlFor={'lastName'}>{t('lastName')}</label>
                <input
                  type={'text'}
                  id={'lastName'}
                  placeholder={t('lastName')}
                  required
                />
              </div>
              <div className={'inputWrapper'}>
                <label htmlFor={'dateOfBirth'}>{t('dateOfBirth')}</label>
                <DatePicker
                  onDateChange={(): void => {}}
                  customStyle={{width: '75%'}}
                />
              </div>
              <div className={'inputWrapper'}>
                <label htmlFor={'startDate'}>{t('startDate')}</label>
                <input
                  type={'date'}
                  id={'startDate'}
                  placeholder={t('startDate')}
                  required
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
                  placeholder={t('street')}
                  required
                />
              </div>
              <div className={'inputWrapper'}>
                <label htmlFor={'city'}>{t('city')}</label>
                <input
                  type={'text'}
                  id={'city'}
                  placeholder={t('city')}
                  required
                />
              </div>
              <div className={'inputWrapper'}>
                <label htmlFor={'state'}>{t('state')}</label>
                <Select
                  id={'state'}
                  placeholder={'State'}
                  options={countryStates}
                />
              </div>
              <div className={'inputWrapper'}>
                <label htmlFor={'zipCode'}>{t('zipCode')}</label>
                <input
                  type={'text'}
                  id={'zipCode'}
                  placeholder={t('zipCode')}
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
                placeholder={t('department')}
                options={selectDepartmentOptions}
              />
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

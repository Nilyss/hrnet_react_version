// styles
import './newEmployeeForm.scss'

// types
import { ReactElement } from 'react'

// hooks | libraries
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function NewEmployeeForm(): ReactElement {
  const { t } = useTranslation()
  return (
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
            <input
              type={'date'}
              id={'dateOfBirth'}
              placeholder={t('dateOfBirth')}
              required
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
            <input type={'text'} id={'city'} placeholder={t('city')} required />
          </div>
          <div className={'inputWrapper'}>
            <label htmlFor={'state'}>{t('state')}</label>
            <input
              type={'text'}
              id={'state'}
              placeholder={t('state')}
              required
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
        <div className={'inputWrapper'}>
          <label htmlFor={'department'}>{t('department')}</label>
          <select id={'department'} required>
            <option value={''}>{t('department')}</option>
            <option value={''}>Service 1</option>
            <option value={''}>Service 2</option>
            <option value={''}>Service 3</option>
          </select>
        </div>
        <div className={'buttonWrapper'}>
          <button className={'buttonDisabled'} type={'submit'} disabled={true}>
            {t('save')}
          </button>
          <Link to={'/'} className={'returnButton'}>
            {t('home')}
          </Link>
        </div>
      </div>
    </form>
  )
}

// styles
import './createEmployee.scss'

// types
import { ReactElement } from 'react'

// components
import NewEmployeeForm from '../../components/newEmployeeForm/NewEmployeeForm'

// hooks | libraries
import { useTranslation } from 'react-i18next'

export default function CreateEmployee(): ReactElement {
  const { t } = useTranslation()
  return (
    <main id="createEmployee">
      <h2>{t('createEmployeeForm')}</h2>
      <div className={'formWrapper'}>
        <NewEmployeeForm />
      </div>
    </main>
  )
}

// styles
import './currentEmployees.scss'

// types
import { ReactElement } from 'react'

// components

// hooks | libraries
import { useTranslation } from 'react-i18next'

export default function CurrentEmployees(): ReactElement {
  const { t } = useTranslation()

  return (
    <main id="currentEmployees">
      <h2>{t('curentEmployees')}</h2>
    </main>
  )
}

// styles
import './footer.scss'

// types
import { ReactElement } from 'react'

// hooks | libraries
import { useTranslation } from 'react-i18next'

export default function Footer(): ReactElement {
  const { t, i18n } = useTranslation()

  const changeLanguage: (lng: string) => void = (lng: string): void => {
    i18n.changeLanguage(lng).finally()
  }

  return (
    <footer>
      <blockquote>
        <span className={'brandColor'}>HR</span>net ©2024 {t('credentials')}.
      </blockquote>
      <div className={'languageButtonsWrapper'}>
        <button onClick={() => changeLanguage('en')}>🇬🇧 English</button>
        <button onClick={() => changeLanguage('fr')}>🇫🇷 Français</button>
      </div>
    </footer>
  )
}

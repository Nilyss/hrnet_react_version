// styles
import './navigationBanner.scss'

// assets | icons
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoCloseOutline } from 'react-icons/io5'

// hooks | libraries
import { useState, useEffect, ReactElement } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NavigationBanner(): ReactElement {
  const { t, i18n } = useTranslation()

  const mobileWidth = 768
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < mobileWidth,
  )

  const handleResize: () => void = (): void => {
    setIsMobile(window.innerWidth < mobileWidth)
  }

  const handleMenuClick: () => void = (): void => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLinkClick: () => void = (): void => {
    if (isMobile) {
      setIsMenuOpen(false)
    }
  }

  const changeLanguage: (lng: string) => void = (lng: string): void => {
    i18n.changeLanguage(lng).finally()
  }

  useEffect((): (() => void) => {
    window.addEventListener('resize', handleResize)
    return (): void => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // disable scrolling when menu is open on mobile
  useEffect((): (() => void) => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return (): void => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  const NavLinks: ({
    onLinkClick,
  }: {
    onLinkClick?: () => void
  }) => ReactElement = ({
    onLinkClick = (): void => {},
  }: {
    onLinkClick?: () => void
  }): ReactElement => {
    return (
      <div className="linksContainer">
        <Link
          to={'/home'}
          className={location.pathname === '/home' ? 'active' : ''}
          onClick={onLinkClick}
        >
          {t('homeMenu')}
        </Link>
        <Link
          to="/current_employees"
          className={location.pathname === '/current_employees' ? 'active' : ''}
          onClick={onLinkClick}
        >
          {t('viewCurrentEmployees')}
        </Link>
        <Link
          to="/create_employee"
          className={location.pathname === '/create_employee' ? 'active' : ''}
          onClick={onLinkClick}
        >
          {t('createEmployee')}
        </Link>
      </div>
    )
  }

  const MenuLinks: () => ReactElement = (): ReactElement => {
    return (
      <>
        {isMenuOpen ? (
          <div
            className={'menuContainer'}
            data-aos={'fade-left'}
            data-aos-duration={300}
          >
            <IoCloseOutline className={'closeIcon'} onClick={handleMenuClick} />
            <NavLinks onLinkClick={handleLinkClick} />

            <div className={'languageButtonsWrapper'}>
              <button onClick={() => changeLanguage('en')}>🇬🇧 English</button>
              <button onClick={() => changeLanguage('fr')}>🇫🇷 Français</button>
            </div>
          </div>
        ) : (
          <RxHamburgerMenu className={'openIcon'} onClick={handleMenuClick} />
        )}
      </>
    )
  }

  return (
    <nav id={'navigationBanner'}>{isMobile ? <MenuLinks /> : <NavLinks />}</nav>
  )
}

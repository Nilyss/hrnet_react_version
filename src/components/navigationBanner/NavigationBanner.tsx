// styles
import './navigationBanner.scss'

// assets | icons
import { RxHamburgerMenu } from 'react-icons/rx'
import { IoCloseOutline } from 'react-icons/io5'

// types
import { ReactElement } from 'react'

// hooks | libraries
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function NavigationBanner(): ReactElement {
  const { t } = useTranslation()

  const mobileWidth = 768
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(
    window.innerWidth < mobileWidth,
  )

  const handleResize = () => {
    setIsMobile(window.innerWidth < mobileWidth)
  }

  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLinkClick = () => {
    if (isMobile) {
      setIsMenuOpen(false)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // disable scrolling when menu is open on mobile
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isMenuOpen])

  const NavLinks = ({ onLinkClick = () => {} }): ReactElement => {
    return (
      <div className="linksContainer">
        <Link
          to="/current_employees"
          className={
            location.pathname === '/current_employees' ? 'active' : ''
          }
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

  return (
    <nav id={'navigationBanner'}>
      {isMobile ? (
        isMenuOpen ? (
          <div
            className={'menuContainer'}
            data-aos={'fade-left'}
            data-aos-duration={300}
          >
            <IoCloseOutline className={'closeIcon'} onClick={handleMenuClick} />
            <NavLinks onLinkClick={handleLinkClick} />
          </div>
        ) : (
          <RxHamburgerMenu className={'openIcon'} onClick={handleMenuClick} />
        )
      ) : (
        <NavLinks />
      )}
    </nav>
  )
}

// styles
import './header.scss'

// assets
import bandingLogo from '../../assets/logos/branding_logo.webp'

// hooks | libraries
import { Link } from 'react-router-dom'

// types
import { ReactElement } from 'react'

export default function Header(): ReactElement {
  return (
    <header>
      <Link to={'/'} title={'Home'} className={'brandingContainer'}>
        <figure>
          <img src={bandingLogo} alt="branding HRnet logo" />
        </figure>
        <h1>
          <span className={'brandColor'}>HR</span>net
        </h1>
      </Link>
    </header>
  )
}

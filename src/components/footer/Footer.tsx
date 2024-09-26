// styles
import './footer.scss'

// types
import { ReactElement } from 'react'

export default function Footer(): ReactElement {
  return (
    <footer>
      <blockquote>
        <span className={'brandColor'}>HR</span>net ©2024 is a brand of the
        WealthHealth company. All right reserved.
      </blockquote>
    </footer>
  )
}

// styles | icons
import './backToTop.scss'
import { FaRegArrowAltCircleUp } from 'react-icons/fa'

// hooks | libraries
import { useEffect, useState, ReactElement } from 'react'

export default function BackToTop(): ReactElement {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const scrollToTop: () => void = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  const toggleVisibility: () => void = (): void => {
    const scrollY: number = window.scrollY
    if (scrollY > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  useEffect((): (() => void) => {
    window.addEventListener('scroll', toggleVisibility)
    return (): void => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <>
      {isVisible && (
        <button
          data-aos={'fade-up'}
          data-aos-duration={300}
          onClick={scrollToTop}
          id={'backToTop'}
        >
          <FaRegArrowAltCircleUp fill={'#000000'} />
        </button>
      )}
    </>
  )
}

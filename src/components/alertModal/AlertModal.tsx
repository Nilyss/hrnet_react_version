// styles | assets
import './alertModal.scss'
import { MdOutlineClose } from 'react-icons/md'

// types
export interface IAlertModalProps {
  props: {
    textAlert: string
    setIsAlertOpen: Dispatch<boolean>
    isAlertOpen: boolean
  }
}

// hooks | libraries
import {
  Dispatch,
  MutableRefObject,
  ReactElement,
  useEffect,
  useRef,
} from 'react'

export default function AlertModal({
  props,
}: Readonly<IAlertModalProps>): ReactElement {
  const { textAlert, setIsAlertOpen, isAlertOpen } = props
  const modalContainer: MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement | null>(null)

  useEffect((): (() => void) => {
    const handleClickOutside: (event: MouseEvent) => void = (
      event: MouseEvent,
    ): void => {
      event.preventDefault()
      if (
        modalContainer.current &&
        !modalContainer.current.contains(event.target as Node)
      ) {
        setIsAlertOpen(false)
      }
    }
    if (isAlertOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isAlertOpen])

  return (
    <section id={'alertModal'}>
      <div ref={modalContainer} className={'modalContainer'}>
        <MdOutlineClose
          className={'closeIcon'}
          title={'Close'}
          onClick={(): void => setIsAlertOpen(false)}
        />
        <div className={'textContainer'}>
          <p className={'textAlert'}>{textAlert}</p>
        </div>
      </div>
    </section>
  )
}

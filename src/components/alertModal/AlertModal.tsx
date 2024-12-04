// styles | assets
import './alertModal.scss'
import { MdOutlineClose } from 'react-icons/md'

// types
export interface IAlertModalProps {
  props: {
    textAlert: string
    setIsAlertOpen: Dispatch<boolean>
  }
}

// hooks | libraries
import { Dispatch, ReactElement } from 'react'

export default function AlertModal({
  props,
}: Readonly<IAlertModalProps>): ReactElement {
  const { textAlert, setIsAlertOpen } = props
  return (
    <section id={'alertModal'}>
      <div className={'modalContainer'}>
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

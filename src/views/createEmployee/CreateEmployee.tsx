// styles
import './createEmployee.scss'

// types
import { ReactElement } from 'react'

// components
import NewEmployeeForm from '../../components/newEmployeeForm/NewEmployeeForm'


export default function CreateEmployee(): ReactElement {

  return (
    <main id="createEmployee">
      <NewEmployeeForm />
    </main>
  )
}

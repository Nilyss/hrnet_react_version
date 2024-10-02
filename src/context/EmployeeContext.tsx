// types
import { ReactElement, createContext, useState, Context } from 'react'
import { IEmployee } from '../utils/interface/employee.ts'
interface IEmployeeContext {
  employees: IEmployee[] | null
  getEmployees: () => void
}

// services
import { getEmployeesService } from '../services/employee/getEmployee.service.ts'

export const EmployeeContext: Context<IEmployeeContext> =
  createContext<IEmployeeContext>({
    employees: null,
    getEmployees: async (): Promise<void> => {},
  })

export const EmployeeProvider = ({
  children,
}: {
  children: ReactElement
}): ReactElement => {
  const [employees, setEmployees] = useState<IEmployee[] | null>(null)

  const getEmployees: () => Promise<void> = async (): Promise<void> => {
    const employeesDatas: IEmployee[] = await getEmployeesService()
    setEmployees(employeesDatas)
  }

  return (
    <EmployeeContext.Provider value={{ employees, getEmployees }}>
      {children}
    </EmployeeContext.Provider>
  )
}

// hooks libraries
import {
  ReactElement,
  createContext,
  useState,
  useMemo,
  useCallback,
  Context,
} from 'react'

// types
import { IEmployee } from '../utils/interface/employee.ts'
interface IEmployeeContext {
  employees: IEmployee[] | null
  getEmployees: () => void
}

// services
import { getEmployeesService } from '../API/services/employee/getEmployee.service.ts'

export const EmployeeContext: Context<IEmployeeContext> =
  createContext<IEmployeeContext>({
    employees: null,
    getEmployees: () => Promise<void>,
  })

export const EmployeeProvider = ({
  children,
}: {
  children: ReactElement
}): ReactElement => {
  const [employees, setEmployees] = useState<IEmployee[] | null>(null)

  const getEmployees: () => Promise<void> =
    useCallback(async (): Promise<void> => {
      const employeesDatas: IEmployee[] = await getEmployeesService()
      setEmployees(employeesDatas)
    }, [])

  const value: {
    employees: IEmployee[] | null
    getEmployees: () => Promise<void>
  } = useMemo(
    (): {
      employees: IEmployee[] | null
      getEmployees: () => Promise<void>
    } => ({
      employees,
      getEmployees,
    }),
    [employees, getEmployees],
  )

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  )
}

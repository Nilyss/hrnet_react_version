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
  addEmployee: (employee: IEmployee) => void
}

// services
import { getEmployeesService } from '../API/services/employee/getEmployee.service.ts'

export const EmployeeContext: Context<IEmployeeContext> =
  createContext<IEmployeeContext>({
    employees: null,
    getEmployees: () => Promise<void>,
    addEmployee: () => {},
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

  const addEmployee = useCallback((newEmployee: IEmployee): void => {
    setEmployees((prev) => (prev ? [...prev, newEmployee] : [newEmployee]))
  }, [])

  const value: {
    employees: IEmployee[] | null
    getEmployees: () => Promise<void>
    addEmployee: (employee: IEmployee) => void
  } = useMemo(
    (): {
      employees: IEmployee[] | null
      getEmployees: () => Promise<void>
      addEmployee: (employee: IEmployee) => void
    } => ({
      employees,
      getEmployees,
      addEmployee,
    }),
    [employees, getEmployees, addEmployee],
  )

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  )
}

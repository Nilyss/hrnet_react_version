import {useState, useMemo, useCallback, ReactElement} from 'react'

import {IEmployee} from '../../utils/interface/employee'
import {
  EmployeeContext,
  IEmployeeContext
} from './EmployeeContext'

import {getEmployeesService} from '../../API/services/employee/getEmployee.service'

export const EmployeeProvider = ({
  children,
}: {
  children: ReactElement
}) : ReactElement => {
  const [employees, setEmployees] = useState<IEmployee[] | null>(null)

  const getEmployees: () => Promise<void> =
    useCallback(async (): Promise<void> => {
      const employeesDatas: IEmployee[] = await getEmployeesService()
      setEmployees(employeesDatas)
    }, [])

  const addEmployee = useCallback((newEmployee: IEmployee): void => {
    setEmployees((prev: IEmployee[] | null): IEmployee[] => (prev ? [...prev, newEmployee] : [newEmployee]))
  }, [])

  const contextValue: IEmployeeContext = useMemo(
    (): {
      employees: IEmployee[] | null
      addEmployee: (employee: IEmployee) => void
      getEmployees: () => Promise<void>
    } => ({
      employees,
      addEmployee,
      getEmployees,
    }),
    [employees, addEmployee, getEmployees]
  )

  return (
    <EmployeeContext.Provider value={contextValue}>
      {children}
    </EmployeeContext.Provider>
  )
}
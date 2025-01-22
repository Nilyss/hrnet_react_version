import { Context, createContext, Dispatch, SetStateAction } from 'react'

import { IEmployee } from '../../utils/interface/employee'

export interface IEmployeeContext {
  employees: IEmployee[] | null
  addEmployee: (employee: IEmployee) => void
  getEmployees: () => void
}

const defaultEmployeeContext: IEmployeeContext = {
  employees: null,
  addEmployee: (): Dispatch<SetStateAction<IEmployee[] | null>> =>
    ({}) as Dispatch<SetStateAction<IEmployee[] | null>>,
  getEmployees: async (): Promise<void> => {},
}

export const EmployeeContext: Context<IEmployeeContext> =
  createContext<IEmployeeContext>(defaultEmployeeContext)

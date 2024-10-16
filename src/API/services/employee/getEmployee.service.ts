// utils
import { isOnProduction } from '../../../utils/utils.ts'

// types
import { AxiosResponse } from 'axios'

// API
import { getRequest } from '../../APICalls.ts'
import { IEmployee } from '../../../utils/interface/employee.ts'

export const getEmployeesService: () => Promise<
  IEmployee[]
> = async (): Promise<IEmployee[]> => {
  const endpoint: string = isOnProduction()
    ? '/employeesMock.JSON'
    : '/employeesMock.json'

  const res: AxiosResponse = await getRequest(endpoint)
  const employeesArray: string[][] = res.data.employees

  return employeesArray.map(employeeArray => ({
    firstName: employeeArray[0],
    lastName: employeeArray[1],
    startDate: employeeArray[2],
    department: employeeArray[3],
    dateOfBirth: employeeArray[4],
    street: employeeArray[5],
    city: employeeArray[6],
    state: employeeArray[7],
    zipCode: employeeArray[8]
  }))

}

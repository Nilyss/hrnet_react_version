// styles
import './currentEmployees.scss'

// types
import { ReactElement } from 'react'
import { IEmployee } from '../../utils/interface/employee.ts'
import { ITlr } from '../../utils/interface/tlr.ts'

// hooks | library
import Tlr from '../../components/tlr/Tlr.tsx'
import { useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'

// context
import { EmployeeContext } from '../../context/EmployeeContext.tsx'

export default function CurrentEmployees(): ReactElement {
  const { employees, getEmployees } = useContext(EmployeeContext)
  const { t } = useTranslation()

  useEffect((): void => {
    if (!employees) {
      getEmployees()
    }
  }, [])

  const tableHead: string[] = [
    t('firstName'),
    t('lastName'),
    t('startDate'),
    t('department'),
    t('dateOfBirth'),
    t('street'),
    t('city'),
    t('state'),
    t('zipCode'),
  ]

  const tableBody: string[][] = employees
    ? employees.map((employee: IEmployee): string[] => [
        employee.firstName,
        employee.lastName,
        employee.startDate,
        employee.department,
        employee.dateOfBirth,
        employee.street,
        employee.city,
        employee.state,
        employee.zipCode,
      ])
    : []

  const table: ITlr = {
    tableHead,
    tableBody,
  }

  return (
    <main id="currentEmployees">
      {/*<h2>{t('currentEmployees')}</h2>*/}
      {employees && (
        <Tlr
          datas={table}
          showSearchBar={true}
          showItemsPerPageSelector={true}
          showPagination={true}
          showPreviousNextButtons={true}
          enableColumnSorting={true}
        />
      )}
    </main>
  )
}

// utils
import { convertDateToFr, convertDateToEn } from '../../utils/utils.ts'

// styles
import './currentEmployees.scss'
import 'nillys-react-table-library/style'

// custom types
import { IEmployee } from '../../utils/interface/employee.ts'

// hooks | library
import { NRTL } from 'nillys-react-table-library' //https://www.npmjs.com/package/nillys-react-table-library
import { useEffect, useContext, ReactElement } from 'react'
import { useTranslation } from 'react-i18next'

// components
import BackToTop from '../../components/backToTop/BackToTop'

// context
import { EmployeeContext } from '../../context/employeeContext/EmployeeContext.tsx'

export default function CurrentEmployees(): ReactElement {
  const { employees, getEmployees } = useContext(EmployeeContext)
  const { t, i18n } = useTranslation()

  useEffect((): void => {
    if (!employees) {
      getEmployees()
    }
  }, [employees, getEmployees])

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
        i18n.language === 'en'
          ? convertDateToEn(employee.startDate)
          : convertDateToFr(employee.startDate),
        employee.department,
        i18n.language === 'en'
          ? convertDateToEn(employee.dateOfBirth)
          : convertDateToFr(employee.dateOfBirth),
        employee.street,
        employee.city,
        employee.state,
        employee.zipCode,
      ])
    : []

  const table = {
    tableHead,
    tableBody,
  }

  return (
    <>
      <BackToTop />
      <main id="currentEmployees">
        <h2>{t('currentEmployees')}</h2>
        {employees && (
          <NRTL
            datas={table}
            headerBackgroundColor={'linear-gradient(to left, #d5e065, #a8c24e)'}
            headerHoverBackgroundColor={'#a8c24e'}
            textColor={'#36395a'}
            rowColor={'#ffffff'}
            rowHoverColor={'#36395a'}
            hoverTextColor={'#ffffff'}
            disabledButtonColor={'#dcdcdc'}
            columnSortingColor={'#dcdcdc'}
            columnSortingFullFilledColor={'#36395a'}
            showSearchBar={true}
            showItemsPerPageSelector={true}
            showPagination={true}
            showPreviousNextButtons={true}
            enableColumnSorting={true}
            itemsPerPageOptions={[25, 50, 100]}
            language={t('tableLang')}
          />
        )}
      </main>
    </>
  )
}

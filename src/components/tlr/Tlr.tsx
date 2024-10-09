// styles
import './tlr.scss'

// types
import { ReactElement, ChangeEvent } from 'react'
import { ITlrProps } from '../../utils/interface/tlr.ts'

// hooks
import { useState, useMemo } from 'react'

export default function Tlr({ datas }: ITlrProps): ReactElement {
  const [page, setPage] = useState<number>(1)
  const [itemsPerPage, setItemsPerPage] = useState<number>(25)
  const [sortConfig, setSortConfig] = useState<{
    key: number
    direction: string
  } | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')

  const removeAccents: (string: string) => string = (
    string: string,
  ): string => {
    return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  }

  const sortedData: string[][] | undefined = useMemo(():
    | string[][]
    | undefined => {
    let sortableData: string[][] = [...datas.tableBody]

    if (sortConfig !== null) {
      sortableData = sortableData.sort((a: string[], b: string[]): number => {
        const aValue: string = a[sortConfig.key]
        const bValue: string = b[sortConfig.key]

        if (!isNaN(Date.parse(aValue)) && !isNaN(Date.parse(bValue))) {
          return sortConfig.direction === 'ascending'
            ? new Date(aValue).getTime() - new Date(bValue).getTime()
            : new Date(bValue).getTime() - new Date(aValue).getTime()
        } else if (!isNaN(Number(aValue)) && !isNaN(Date.parse(bValue))) {
          return sortConfig.direction === 'ascending'
            ? Number(aValue) - Number(bValue)
            : Number(bValue) - Number(aValue)
        } else {
          return sortConfig.direction === 'ascending'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue)
        }
      })
    }

    if (searchTerm.length > 0) {
      return sortableData.filter((row: string[]): boolean => {
        return row.some((cell: string): boolean => {
          return removeAccents(cell.toLowerCase()).includes(
            removeAccents(searchTerm.toLowerCase()),
          )
        })
      })
    }

    return sortableData.filter((row: string[]): boolean => {
      return row.some((cell: string): boolean => {
        return cell.toLowerCase().includes(searchTerm.toLowerCase())
      })
    })
  }, [datas.tableBody, sortConfig, searchTerm])

  const totalPages: number = Math.ceil(sortedData!.length / itemsPerPage)

  const currentData: string[][] = useMemo((): string[][] => {
    const startIndex: number = (page - 1) * itemsPerPage
    const endIndex: number = startIndex + itemsPerPage
    return sortedData!.slice(startIndex, endIndex)
  }, [sortedData, page, itemsPerPage])

  const handlePreviousPage: () => void = (): void => {
    setPage((prevPage: number): number => Math.max(prevPage - 1, 1))
  }

  const handleNextPage: () => void = (): void => {
    setPage((prevPage: number): number => Math.min(prevPage + 1, totalPages))
  }

  const handleItemsPerPageChange: (
    event: ChangeEvent<HTMLSelectElement>,
  ) => void = (event: ChangeEvent<HTMLSelectElement>): void => {
    setItemsPerPage(Number(event.target.value))
    setPage(1)
  }

  const requestSort: (key: number) => void = (key: number): void => {
    let direction: string = 'ascending'
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending'
    }
    setSortConfig({ key, direction })
  }

  const handleSearchChange: (event: ChangeEvent<HTMLInputElement>) => void = (
    event: ChangeEvent<HTMLInputElement>,
  ): void => {
    setSearchTerm(event.target.value)
    setPage(1)
  }

  return (
    <section id={'TLR'}>
      <>
        <div className={'tableHeader'}>
          <div className={'selectContainer'}>
            <label htmlFor={'itemsPerPage'}>Show</label>
            <select
              id={'itemsPerPage'}
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <label htmlFor={'itemsPerPage'}>entries</label>
          </div>
          <div className={'searchContainer'}>
            <label htmlFor={'filter'}>Search: </label>
            <input id={'filter'} type={'text'} onChange={handleSearchChange} />
          </div>
        </div>

        <table>
          <thead>
            <tr>
              {datas.tableHead.map(
                (head: string, index: number): ReactElement => (
                  <th key={index} onClick={(): void => requestSort(index)}>
                    {head}
                    <div>
                      <span
                        className={`chevron ${sortConfig?.key === index && sortConfig.direction === 'ascending' ? 'chevron-active' : ''}`}
                      >
                        <svg width="12" height="12" viewBox="0 0 20 20">
                          <polyline points="5,15 10,5 15,15" strokeWidth="2" />
                        </svg>
                      </span>
                      <span
                        className={`chevron ${sortConfig?.key === index && sortConfig.direction === 'descending' ? 'chevron-active' : ''}`}
                      >
                        <svg width="12" height="12" viewBox="0 0 20 20">
                          <polyline points="5,5 10,15 15,5" strokeWidth="2" />
                        </svg>
                      </span>
                    </div>
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map(
                (body: string[], index: number): ReactElement => (
                  <tr key={index}>
                    {body.map(
                      (cell: string, cellIndex: number): ReactElement => (
                        <td key={cellIndex}>{cell}</td>
                      ),
                    )}
                  </tr>
                ),
              )
            ) : (
              <tr>
                <td
                  colSpan={datas.tableHead.length}
                  style={{ textAlign: 'center' }}
                >
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className={'tableFooter'}>
          {sortedData && (
            <p>
              Showing {Math.min(page * itemsPerPage, sortedData.length)}/
              {sortedData.length} entries
            </p>
          )}
          <div className={'buttonContainer'}>
            <button
              className={'button'}
              onClick={handlePreviousPage}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className={'button'}
              onClick={handleNextPage}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </>
    </section>
  )
}

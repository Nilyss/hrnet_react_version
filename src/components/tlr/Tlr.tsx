// styles
import './tlr.scss'

// types
import { ReactElement, useState, useMemo } from 'react'
import { ITlrProps } from '../../utils/interface/tlr.ts'

export default function Tlr({ datas }: ITlrProps): ReactElement {
  const [page, setPage] = useState<number>(1)
  const [sortConfig, setSortConfig] = useState<{
    key: number
    direction: string
  } | null>(null)

  const sortedData: string[][] | undefined = useMemo(():
    | string[][]
    | undefined => {
    if (sortConfig !== null) {
      return [...datas.tableBody].sort((a: string[], b: string[]): number => {
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
    return datas.tableBody
  }, [datas.tableBody, sortConfig])

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

  return (
    <section id={'TLR'}>
      <table>
        <thead>
          <tr>
            {datas.tableHead.map(
              (head: string, index: number): ReactElement => (
                <th key={index} onClick={(): void => requestSort(index)}>
                  {head}

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
                </th>
              ),
            )}
          </tr>
        </thead>

        <tbody>
          {sortedData && (
            <>
              {sortedData.map(
                (body: string[], index: number): ReactElement => (
                  <tr key={index}>
                    {body.map(
                      (cell: string, cellIndex: number): ReactElement => (
                        <td key={cellIndex}>{cell}</td>
                      ),
                    )}
                  </tr>
                ),
              )}
            </>
          )}
        </tbody>
      </table>
      <div className={'tableFooter'}>
        <p>
          Showing {sortedData?.length} of {datas.tableBody.length} entries
        </p>
        <div className={'buttonContainer'}>
          <button
            className={'button'}
            onClick={(): void => {
              setPage(page - 1)
            }}
          >
            Previous
          </button>
          <button
            className={'button'}
            onClick={(): void => {
              setPage(page + 1)
            }}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  )
}

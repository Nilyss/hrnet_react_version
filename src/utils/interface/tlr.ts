export interface ITlrProps {
  datas: ITlr
  headerBackgroundColor?: string
  headerHoverBackgroundColor?: string
  textColor?: string
  rowColor?: string
  rowHoverColor?: string
  hoverTextColor?: string
  disabledButtonColor?: string
  columnSortingColor?: string
  columnSortingFullFilledColor?: string
  showSearchBar?: boolean
  showItemsPerPageSelector?: boolean
  showPagination?: boolean
  showPreviousNextButtons?: boolean
  enableColumnSorting?: boolean
  itemsPerPageOptions?: number[]
}
export interface ITlr {
  tableHead: string[]
  tableBody: string[][]
}

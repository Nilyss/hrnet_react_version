import { useState, useMemo, useCallback, ReactElement } from 'react'

import { ICountryState } from '../../utils/interface/countryState'
import {
  CountryStateContext,
  ICountryStateContext,
} from './CountryStateContext'

import { getCountryStateService } from '../../API/services/countryState/getCountryState.service'

export const CountryStateProvider = ({
  children,
}: {
  children: ReactElement
}): ReactElement => {
  const [countryStates, setCountryStates] = useState<ICountryState[] | null>(
    null,
  )

  const getCountryStates = useCallback(async (): Promise<void> => {
    try {
      const res: ICountryState[] = await getCountryStateService()
      setCountryStates(res)
    } catch (error) {
      console.error(`Error while fetching country states: ${error}`)
      setCountryStates(null)
    }
  }, [])

  const contextValue: ICountryStateContext = useMemo(
    () => ({
      countryStates,
      setCountryStates,
      getCountryStates,
    }),
    [countryStates, getCountryStates],
  )

  return (
    <CountryStateContext.Provider value={contextValue}>
      {children}
    </CountryStateContext.Provider>
  )
}

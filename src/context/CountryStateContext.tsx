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
import { ICountryState } from '../utils/interface/countryState'
interface ICountryStateContext {
  countryStates: ICountryState[] | null
  getCountryStates: () => void
}

// services
import { getCountryStateService } from '../API/services/countryState/getCountryState.service.ts'

export const CountryStateContext: Context<ICountryStateContext> =
  createContext<ICountryStateContext>({
    countryStates: null,
    getCountryStates: () => Promise<void>,
  })

export const CountryStateProvider = ({
  children,
}: {
  children: ReactElement
}): ReactElement => {
  const [countryStates, setCountryStates] = useState<ICountryState[] | null>(
    null,
  )

  const getCountryStates: () => Promise<void> =
    useCallback(async (): Promise<void> => {
      const countryStatesData: ICountryState[] = await getCountryStateService()
      setCountryStates(countryStatesData)
    }, [])

  const value: {
    countryStates: ICountryState[] | null
    getCountryStates: () => Promise<void>
  } = useMemo(
    (): {
      countryStates: ICountryState[] | null
      getCountryStates: () => Promise<void>
    } => ({
      countryStates,
      getCountryStates,
    }),
    [countryStates, getCountryStates],
  )

  return (
    <CountryStateContext.Provider value={value}>
      {children}
    </CountryStateContext.Provider>
  )
}

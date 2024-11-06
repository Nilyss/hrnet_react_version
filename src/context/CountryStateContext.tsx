// types
import { ReactElement, createContext, useState, Context } from 'react'
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
    getCountryStates: async (): Promise<void> => {},
  })

export const CountryStateProvider = ({
  children,
}: {
  children: ReactElement
}): ReactElement => {
  const [countryStates, setCountryStates] = useState<ICountryState[] | null>(
    null,
  )

  const getCountryStates: () => Promise<void> = async (): Promise<void> => {
    const countryStatesData: ICountryState[] = await getCountryStateService()
    setCountryStates(countryStatesData)
  }

  return (
    <CountryStateContext.Provider value={{ countryStates, getCountryStates }}>
      {children}
    </CountryStateContext.Provider>
  )
}

import { Context, createContext, Dispatch, SetStateAction } from 'react'

import { ICountryState } from '../../utils/interface/countryState'
export interface ICountryStateContext {
  countryStates: ICountryState[] | null
  setCountryStates: Dispatch<SetStateAction<ICountryState[] | null>>
  getCountryStates: () => void
}

const defaultCountryStateContext: ICountryStateContext = {
  countryStates: null,
  setCountryStates: (): Dispatch<SetStateAction<ICountryState[] | null>> =>
    ({}) as Dispatch<SetStateAction<ICountryState[] | null>>,
  getCountryStates: async (): Promise<void> => {},
}

export const CountryStateContext: Context<ICountryStateContext> =
  createContext<ICountryStateContext>(defaultCountryStateContext)

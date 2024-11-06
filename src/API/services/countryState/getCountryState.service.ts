// utils
import { isOnProduction } from '../../../utils/utils.ts'

// types
import { AxiosResponse } from 'axios'

// API
import { getRequest } from '../../APICalls.ts'
import { ICountryState } from '../../../utils/interface/countryState.ts'

export const getCountryStateService: () => Promise<
  ICountryState[]
> = async (): Promise<ICountryState[]> => {
  const endpoint: string = isOnProduction()
    ? '/countryStateMock.JSON'
    : '/countryStateMock.JSON'

  const res: AxiosResponse = await getRequest(endpoint)
  return res.data.countryState
}

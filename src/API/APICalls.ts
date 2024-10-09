// utils
import { isOnProduction } from '../utils/utils'

// libraries
import axios, { AxiosResponse } from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000
axios.defaults.baseURL = isOnProduction()
  ? 'https://nilyss.github.io/hrnet_mokup_datas'
  : '/public/mockup'
axios.defaults.withCredentials = isOnProduction() ? false : true

export const getRequest: (url: string) => Promise<AxiosResponse> = async (
  url: string,
): Promise<AxiosResponse> => {
  return await axios.get(url)
}

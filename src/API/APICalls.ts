// utils
import { isOnProduction } from '../utils/utils'

// types
import { AxiosResponse } from 'axios'

// libraries
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000
axios.defaults.baseURL = isOnProduction()
  ? 'https://nilyss.github.io/hrnet_mokup_datas'
  : '/public/mockup'
axios.defaults.withCredentials = !isOnProduction()

export const getRequest: (url: string) => Promise<AxiosResponse> = async (
  url: string,
): Promise<AxiosResponse> => {
  return await axios.get(url)
}

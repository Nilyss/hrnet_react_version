// utils
import { isOnProduction } from '../utils/utils'

// libraries
import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.timeout = 10000
axios.defaults.baseURL = isOnProduction() ? '' : '/public/mockup'
axios.defaults.withCredentials = isOnProduction() ? true : false

export const getRequest = async (url: string) => {
  return await axios.get(url)
}

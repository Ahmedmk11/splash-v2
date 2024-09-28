import axios from 'axios'
import config from '../../config'

const prod = config.PRODUCTION
export let baseURL = ''

if (prod) {
    baseURL = config.REACT_APP_API_URL_PROD
} else {
    baseURL = config.REACT_APP_API_URL_DEV
}

const axiosApi = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

export default axiosApi

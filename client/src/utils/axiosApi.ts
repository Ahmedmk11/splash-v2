import axios from 'axios'
import config from '../../config'

export const baseURL = config.REACT_APP_API_URL

const axiosApi = axios.create({
    baseURL: baseURL,
    withCredentials: true,
})

export default axiosApi

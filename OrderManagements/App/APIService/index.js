import { create } from 'apisauce';
import { APICall, NetworkConfig, Endpoints } from '../API'

const client =  create
({
 baseURL: NetworkConfig.BASE_URL
})

client.addAsyncRequestTransform((request) => async () => {
    //alert("request== "+JSON.stringify(request))
    return new Promise((resolve) => setTimeout(resolve, 2000))
})

client.axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        Promise.reject(error)
    }
)

export default client;
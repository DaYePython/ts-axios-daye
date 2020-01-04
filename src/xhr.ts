import { AxiosRequestConfig, AxiosReponsePromise, AxiosReponse } from './types/index';
import {parseHeaders} from './index'
export default function xhr(config: AxiosRequestConfig): AxiosReponsePromise {
    return new Promise((resolve, reject) => {
        const { data = null, url, method = 'get', headers, responseType } = config

        const request = new XMLHttpRequest()
        if (responseType) {
            request.responseType = responseType
        }

        request.open(method.toUpperCase(), url, true)

        
        Object.keys(headers).forEach((name) => {
            if (data === null && name.toLowerCase() === 'content-type') {
                delete headers[name]
            } else {
                request.setRequestHeader(name, headers[name])
            }
        })
        request.send(data)

        request.onreadystatechange = function handleStateChage() {
            if (request.readyState !== 4) {
                return
            }
            const responseHeaders =  parseHeaders(request.getAllResponseHeaders())
            const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
            const response: AxiosReponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }
    
            resolve(response)
        }
    })
} 
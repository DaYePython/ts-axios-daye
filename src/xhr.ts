import { AxiosRequestConfig, AxiosResponsePromise, AxiosResponse } from './types/index';
import { parseHeaders } from './index'
import { createError } from './helpers/error';
export default function xhr(config: AxiosRequestConfig): AxiosResponsePromise {
    return new Promise((resolve, reject) => {
        const { data = null, url, method = 'get', headers, responseType, timeout } = config

        const request = new XMLHttpRequest()
        if (responseType) {
            request.responseType = responseType
        }

        if (timeout) {
            request.timeout = timeout
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

        // filed error
        request.onerror = function handleError() {
            reject(createError(
                'Network Error',
                config,
                null,
                request
            ))
        }
        // filed timeout
        request.ontimeout = function handleTimeout() {
            reject(createError(
                `Timeout of ${config.timeout} ms exceeded`,
                config,
                'ECONNABORTED',
                request
                )
            )
        }

        // filed reay
        request.onreadystatechange = function handleStateChage() {
            if (request.readyState !== 4) {
                return
            }
            if (request.status === 0) {
                return
              }
            const responseHeaders = parseHeaders(request.getAllResponseHeaders())
            const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
            const response: AxiosResponse = {
                data: responseData,
                status: request.status,
                statusText: request.statusText,
                headers: responseHeaders,
                config,
                request
            }

            return new Promise((resolve, reject) => {
                let status: number = response.status
                if(200 <= status  && status <= 300) {
                    resolve(response)
                }else{
                    reject(createError(
                        `Request failed with status code ${response.status}`,
                        config,
                        null,
                        request,
                        response
                    ))
                }
            })
        }
    })
} 
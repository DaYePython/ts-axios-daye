import { AxiosRequestConfig, AxiosReponse, AxiosReponsePromise } from './types/index';
import xhr from './xhr';
import { buildUrl } from './helpers/url';
import { transformRequest } from './helpers/data';
import { processHeaders } from './helpers/header';
function axios(config: AxiosRequestConfig): AxiosReponsePromise {
    // TODO
    processConfig(config)
    return xhr(config)
}

/*处理请求 */

function processConfig(config: AxiosRequestConfig): void {
    config.url = transformUrl(config)
    config.headers = transformHeaders(config)
    config.data = transformRequestData(config)
}

function transformUrl(config: AxiosRequestConfig): string {
    const { url, parms } = config
    return buildUrl(url, parms)
}

function transformRequestData(config: AxiosRequestConfig): any {
    const { data } = config
    return transformRequest(data)
}

function transformHeaders(config: AxiosRequestConfig): any {
    const { headers = {}, data } = config
    return processHeaders(headers, data)
}

/* 处理响应 */
function parseHeaders(headers: string): any {
    let parsed = Object.create(null)
    if(!headers) {return parsed}
    headers.split('\r\t').forEach((line) => {
        let {key, value} = line.split(':')
        if(!key){
            return 
        }
        key = key.trim().toLowerCase()
        if(value){
            value = value.trim()
        }

        parsed[key] = value
    })
}


export default axios
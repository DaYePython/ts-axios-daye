/**
 * Common Types In Project
 */

type methods = 'get'| 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch'
type METHODS = 'GET'| 'PUT' | 'POST' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH'

export type Method = methods & METHODS

 export interface AxiosRequestConfig {
    url: string,
    // todo Enum the methods of request
    method?: Method,
    data?: any,
    parms?: any
    headers?: any
    responseType?: XMLHttpRequestResponseType
 } 

 export interface AxiosReponse {
    data: any,
    status: number,
    statusText: string,
    headers: any,
    config: AxiosRequestConfig,
    request: any
 }

 export interface AxiosReponsePromise extends Promise<AxiosReponse>{}
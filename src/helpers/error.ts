import { AxiosRequestConfig, AxiosResponse } from "../types";

export class AxiosError extends Error{
    isAxiosError: boolean = true
    constructor(
        message:string,
        public config: AxiosRequestConfig,
        public code?: string | null,
        public request?: any,
        public response?: AxiosResponse
        ){
            super(message)
            Object.setPrototypeOf(this, AxiosError.prototype)
        }
}

export function createError(
    message:string,
    config: AxiosRequestConfig,
    code?: string | null,
    request?: any,
    response?: AxiosResponse
): AxiosError{
    return new AxiosError(message=message, config=config, code=code, request=request, response=response)
}
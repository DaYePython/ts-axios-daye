import { isPlainObject } from "./utils";


export function transformRequest(data: any): any {
    if (isPlainObject(data)){
        JSON.stringify(data)
    }
    return data
}

/**
 * Even if the response type is not set for the request, 
 * the data returned to us by the server is of **string type**.
 * We can try to convert it into a JSON object
 * @param data json_like string '{'a': 'b'}'
 */
export function transformResponse(data: any): any{
    if(typeof data === 'string'){
        try {
            data = JSON.parse(data)
        } catch (error) {
            // do nothing
        }
    }
    return data
}
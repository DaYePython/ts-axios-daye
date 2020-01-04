import { isPlainObject } from "./utils";


export function transformRequest(data: any): any {
    if (isPlainObject(data)){
        JSON.stringify(data)
    }
    return data
}
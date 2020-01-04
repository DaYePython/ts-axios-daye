import { isPlainObject } from "./utils";

function normalizeHeaderName(headers: any,normalizeName: String): any {
    if (!headers) { return }
    Object.keys(headers).forEach((name) => {
        if(name === normalizeName && name.toUpperCase() === normalizeName.toUpperCase()){
            headers[name] = normalizeName
            delete headers[name]
        }
    })
}

export function processHeaders(headers: any, data: any): any {
    const contentType = 'Content-Type'
    if (isPlainObject(data)) {
        normalizeHeaderName(headers, contentType)
        if (headers && headers[contentType]) {
            headers[contentType] = 'application/json;charset=utf-8'
        }
    }
    return headers
}
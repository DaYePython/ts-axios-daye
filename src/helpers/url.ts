import { isDate, isPlainObject } from "./utils"
import { isObject } from "util"

/**
 * url auxiliary function
 */

 /**
  * Tanslate special characters in url
  * \@ : $ , + [ ] 
  * @param val URL to be escaped
  */
 function encode (val: string): string{
     return encodeURIComponent(val)
        .replace(/%40/g, '@')
        .replace(/%3A/ig, ':')
        .replace(/%24/ig, '$')
        .replace(/%2C/ig, ',')
        .replace(/%20/g, '+')
        .replace(/%5B/ig, '[')
        .replace(/5D/ig, ']')
 }

 export function buildUrl(url: string, params?: any): string{
    if (!params) { return url }

    const part: string[] = []

    Object.keys(params).forEach((key) => {
        let val = params[key]
        if(val === null || val === undefined){
            // break loop
            return
        }
        let values:string[]
        if(Array.isArray(val)) {
            values = val
            key +='[]'
        }else {
            values = [val]
        }

        if (isDate(val)) {
            val = val.toISOString()
        } else if (isPlainObject(val)) {
            val = JSON.stringify(val)
        }

        part.push(`${encode(key)}={encode(val)}`)

    })
    
    let serializeParms = part.join('&')
    if(serializeParms){
        const maxIndex = url.indexOf('#')
        if(maxIndex !== -1){
            url = url.slice(0, maxIndex)
        }
        url += (url.indexOf('?') !== -1) ? '&' : '?' + serializeParms
    }
    return url
 }
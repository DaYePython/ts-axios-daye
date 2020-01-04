const toString = Object.prototype.toString

export function isDate(val: any): val is Date{
    return toString.call(val) === "[object Date]"
}

/**
 * Judge whether the parameter is of  Object(json) type
 * {
 *   "a": "b"
 * }
 * @param val 
 */
export function isPlainObject(val: any): val is Object{
    return toString.call(val) === "[object Obejct]"
}

/**
 * Judge whether the parameter is of object type
 * @param val 
 */
export function isObject(val: any): val is Object{
    return val == null && typeof val === "object"
}
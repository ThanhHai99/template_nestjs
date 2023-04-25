import { Injectable } from '@nestjs/common'
import crypto from 'crypto'

@Injectable()
export class Encode2Service {
  /**
   * Shallow copy an object with sorted keys
   * @param {Object} unorderedObj
   * @return {Object} ordered
   */
  private keysort(unorderedObj: Object): any {
    return Object.keys(unorderedObj)
      .sort()
      .reduce((ordered, key) => {
        ordered[key] = unorderedObj[key]
        return ordered
      }, {})
  }

  /**
   * { key: value } => 'keyvalue'
   * @param {Object} paramsObjSorted
   * @return {string} concatString
   */
  private concatDictionaryKeyValue(paramsObjSorted: Object): string {
    return Object.keys(paramsObjSorted).reduce(function (concatString, key) {
      return concatString.concat(key + paramsObjSorted[key])
    }, '')
  }

  /**
   * Calculate a signature hash
   * @param {string} appSecret
   * @param {string} apiEndPoint e.g. /order/get
   * @param {Object} paramsObj
   * @return {string} signature hash
   */

  public generateSignature(appSecret: string, apiEndPoint: string, paramsObj: Object): string {
    // 1. Sort all request parameters (except the “sign” and parameters with byte array type)
    const keysortParams = this.keysort(paramsObj)

    // 2. Concatenate the sorted parameters into a string i.e. "key" + "value" + "key2" + "value2"...
    const concatString = this.concatDictionaryKeyValue(keysortParams)

    // 3. Add API name in front of the string in (2)
    const preSignString = apiEndPoint + concatString

    // 4. Encode the concatenated string in UTF-8 format & and make a digest (HMAC_SHA256)
    const hash = crypto
      .createHmac('sha256', appSecret)
      .update(preSignString)
      // 5. Convert the digest to hexadecimal format
      .digest('hex')

    return hash.toUpperCase() // must use upper case
  }
}

const reduce = require('lodash/reduce')
const map = require('lodash/map')
const reject = require('lodash/reject')
const isUndefined = require('lodash/isUndefined')

export class Utils {
  static guidCounter = 0

  static guid(prefix = '') {
    const id = ++Utils.guidCounter
    return prefix.toString() + id
  }

  static collapse(collection, seed) {
    const reducer = (current, fn) => fn(current)
    return reduce(collection, reducer, seed)
  }

  static instanceOf(klass) {
    return (val) => val instanceof klass
  }

  static interpolate(str, interpolations) {
    return str.replace(/{([^{}]*)}/g, (a, b) => {
      const r = interpolations[b]
      return typeof r === 'string' || typeof r === 'number' ? r : a
    })
  }

  static translate(key, interpolations?) {
    if (interpolations) {
      return Utils.interpolate(key, interpolations)
    }
    return key
  }

  static computeOptionKeys(options, fields, defaultKey) {
    return map(options, (option) => Utils.generateKeyFromFields(option, fields, defaultKey))
  }

  static generateKeyFromFields(ob, fields, defaultKey) {
    if (ob.key) {
      return ob
    }
    const fieldValues = reject(
      map(fields, (field: string) => ob[field]),
      isUndefined
    )
    if (fieldValues.length > 0) {
      ob.key = fieldValues.join('_')
    } else {
      ob.key = defaultKey
    }
    return ob
  }
}

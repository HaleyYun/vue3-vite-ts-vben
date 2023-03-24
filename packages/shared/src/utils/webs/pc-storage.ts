import { isEmpty } from 'lodash'

export default {
  set(key, val) {
    //if (!val && (val !== 0 || val !== false)) return false;
    return localStorage.setItem(key, JSON.stringify(val))
  },
  get(key, defaultValue) {
    const val: any = localStorage.getItem(key)
    if (isEmpty(val)) return false
    try {
      if (!val && defaultValue !== undefined) return defaultValue
      return val
    } catch (e) {
      return false
    }
  },
  remove(key) {
    return localStorage.removeItem(key)
  },
  clear() {
    return localStorage.clear()
  },
}

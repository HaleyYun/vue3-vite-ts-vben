export default {
  set(key, val) {
    return localStorage.setItem(key, JSON.stringify(val))
  },
  get(key) {
    const val = localStorage.getItem(key)
    if (!val) return false
    try {
      return JSON.parse(val)
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

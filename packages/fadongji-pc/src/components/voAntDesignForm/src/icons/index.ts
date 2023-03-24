export default {
  install: () => {
    const context = import.meta.globEager('./svg/*.svg')
    Object.keys(context)
  },
}

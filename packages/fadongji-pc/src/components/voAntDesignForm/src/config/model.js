export const dialogStyle = {
  position: 'absolute',
  right: '150px',
  left: '150px',
  minWidth: '700px',
  width: 'auto',
  top: '56px',
  bottom: '30px',
  minHeight: '500px',
}

export const bodyStyle = {
  height: 'calc(100% - 108px)',
  overflow: 'auto',
}

export const exportData = (data, name) => {
  let content = 'data:text/csv;charset=utf-8,'
  content += data
  var encodedUri = encodeURI(content)
  var actions = document.createElement('a')
  actions.setAttribute('href', encodedUri)
  actions.setAttribute('download', name)
  actions.click()
}

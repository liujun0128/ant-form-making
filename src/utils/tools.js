export function widgetRandomId (length) {
  let str = ''
  for (var i = 1; i <= length; i++) {
    str += 'x'
  }
  return str.replace(/[xy]/g, function (c) {
    const r = Math.random() * 10 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

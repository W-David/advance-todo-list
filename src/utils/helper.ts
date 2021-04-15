export const format = (timeStamp: string): string => {
  console.log(timeStamp)
  const date = new Date(parseInt(timeStamp))
  console.log(date)
  const year = date.getFullYear()
  // js 的日期月份是从 0 开始的...
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  const res = `${year}-${month}-${day} ${hour}:${minute}:${second}`
  return res
}

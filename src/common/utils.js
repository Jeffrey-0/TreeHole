// 防抖函数
export function debounce (func, delay = 500) {
  let timer = null
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

function addZero (num) {
  if (parseInt(num) < 10) {
    num = '0' + num
  }
  return num
}

// 格式化时间
export function getYYYYMMDDMMSS (str) {
  const nDate = new Date(str)
  const nYear = nDate.getFullYear()
  const nMonth = nDate.getMonth() + 1
  const nDay = nDate.getDate()
  const nHours = nDate.getHours()
  const nMinutes = nDate.getMinutes()
  const nSeconds = nDate.getSeconds()
  const nTime = nYear + '-' + addZero(nMonth) + '-' + addZero(nDay) // YYYY-MM-DD
  const nDateTime = nTime + ' ' + addZero(nHours) + ':' + addZero(nMinutes) + ':' + addZero(nSeconds) // YYYY-MM-DD-MM-SS
  // return {
  //   nTime: nTime, // 格式为 YYYY-MM-DD
  //   nDateTime: nDateTime // 格式为 YYYY-MM-DD-HH-MM-SS
  // }
  return nDateTime
}

const fromTimeStampToDate = (timeStamp) => {
  if(parseInt(timeStamp) === 0) return 
  let d = new Date(timeStamp * 1000)
  return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
}

const toTimeStamp = (strDate) => {
  var date = Date.parse(strDate);
  return date / 1000;
}

export {fromTimeStampToDate, toTimeStamp}
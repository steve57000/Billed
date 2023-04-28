export const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const ye = new Intl.DateTimeFormat('fr', { year: 'numeric' }).format(date)
  const mo = new Intl.DateTimeFormat('fr', { month: 'short' }).format(date)
  const da = new Intl.DateTimeFormat('fr', { day: '2-digit' }).format(date)
  const month = mo.charAt(0).toUpperCase() + mo.slice(1)
  console.log(month.substring(0,3))
  console.log(`${parseInt(ye.substring(ye.length-2, ye.length))} son type est: ${typeof(parseInt(ye.substring(ye.length-2, ye.length)))}`)
  console.log(`${parseInt(da)} son type est : ${typeof(parseInt(da))}`)
  console.log(mo)
  return `${parseInt(da)} ${month.substring(0,3)}. ${ye.substring(2, 4)}`
}
 
export const formatStatus = (status) => {
  switch (status) {
    case "pending":
      return "En attente"
    case "accepted":
      return "Accepté"
    case "refused":
      return "Refused"
  }
}
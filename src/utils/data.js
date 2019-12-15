export const getCellById = (id) => {
  let data
  if (window.localStorage.getItem("data")) {
    data = JSON.parse(window.localStorage.getItem("data"))
  } else {
    data=[]
  }
  const cellData = data.filter((v) => +(v.id) === (+id))
  return cellData
}
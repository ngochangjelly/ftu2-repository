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

// this function: string input = "hello test comment", "hihhihi", "alo ao"], return array = "hello test comment", "hihhihi", "alo ao"]
export const stringToArr = (input) => {
  input=input.replace(/[|]/g, '')
  return JSON.parse(input)
}
export const nestedStringArrToArr = (nestedStringArr) => {
  let parsedArr = JSON.parse(nestedStringArr)
  let newArr=[]
  parsedArr.map((item, key) => {
    newArr.push({name: item[0], link:item[1]})
  })
  return newArr
}

export const breakdownMetas = (meta) => {
  let newArr = meta.split(',')
  let processedArr=[]
  newArr.forEach(element => {
    element = element.replace(/"|"/g, '')
    element = element.trim()
    processedArr.push(element)
  });
  return processedArr
}
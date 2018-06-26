export const getItems = () => {
  const listOfItems = window.localStorage.getItem('listOfItems')
  return new Promise((resolve) => {
    resolve(JSON.parse(listOfItems) || [])
  })
}
export const addItem = item => {
  const listOfItems = window.localStorage.getItem('listOfItems')
  const newList = JSON.parse(listOfItems) || []
  window.localStorage.setItem('listOfItems', JSON.stringify([...newList, item]))
  return new Promise(resolve => setTimeout(() => resolve([...newList, item]), 1000))
}
export const removeItem = item => {
  const listOfItems = window.localStorage.getItem('listOfItems')
  const newList = JSON.parse(listOfItems)
  const deletedValue = [...newList].filter(itemList => itemList !== item)
  window.localStorage.setItem('listOfItems', JSON.stringify(deletedValue))
  return new Promise(resolve => setTimeout(() => resolve(deletedValue), 1000))
}

const initData = () => {
  const listOfItems = window.localStorage.getItem('listOfItems')
  return JSON.parse(listOfItems) || []
}
export const getItems = () => new Promise(resolve => resolve(initData()))
export const addItem = item => {
  const newList = initData()
  window.localStorage.setItem('listOfItems', JSON.stringify([...newList, item]))
  return new Promise(resolve => setTimeout(() => resolve([...newList, item]), 1000))
}
export const removeItem = item => {
  const newList = initData()
  const deletedValue = newList.filter(itemList => itemList !== item)
  window.localStorage.setItem('listOfItems', JSON.stringify(deletedValue))
  return new Promise(resolve => setTimeout(() => resolve(deletedValue), 1000))
}

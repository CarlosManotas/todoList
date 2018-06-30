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
export const removeItem = id => {
  const newList = initData()
  const deletedValue = newList.filter(itemList => itemList.id !== id)
  window.localStorage.setItem('listOfItems', JSON.stringify(deletedValue))
  return new Promise(resolve => setTimeout(() => resolve(deletedValue), 1000))
}
export const updateItem = list => {
  const newList = initData()
  const updateList = newList.map(itemList => {
    if (itemList.id === list.id) {
      return ({...itemList, name: list.name})
    }
    return itemList
  })
  window.localStorage.setItem('listOfItems', JSON.stringify(updateList))
  return new Promise(resolve => setTimeout(() => resolve(updateList), 1000))
}

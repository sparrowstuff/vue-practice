function addToLocalStorage(itemsName, items) {
  const dataToStorage = localStorage.setItem(`${itemsName}`, JSON.stringify(items)) || []
}

function getFromLocalStorage(keyName) {
  const data = localStorage.getItem(`${keyName}`)
  return data
}

export { addToLocalStorage, getFromLocalStorage }

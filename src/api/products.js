const getProducts = async () => {
  try {
    const data = await fetch('https://dummyjson.com/products')
    const response = await data.json()
    const products = response.products || []

    // console.log(products)
    return products
  } catch (err) {
    throw new Error('Failed to fetch')
  }
}

function addToLocalStorage(itemsName, items) {
  const dataToStorage = localStorage.setItem(`${itemsName}`, JSON.stringify(items)) || []
}

const productData = (await getProducts()) || []
addToLocalStorage('productData', productData)

export default getProducts

import * as localComponents from '../components/js/localStorage'

const getProducts = async () => {
  try {
    const data = await fetch('https://dummyjson.com/products')
    const response = await data.json()
    const products = response.products || []

    localComponents.addToLocalStorage('productData', products)

    return products
  } catch (err) {
    throw new Error('Failed to fetch')
  }
}

export default getProducts

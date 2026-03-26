import * as localComponents from '../components/js/localStorage'
import { IPagination } from '../components/js/paginationPage'

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

const getPaginatedProducts = async (page = 1) => {
  try {
    const query = new URLSearchParams({
      page: page,
      limit: 3,
    })

    const data = await fetch(`https://dummyjson.com/products/${query}`)
    const response = await data.json()
    const products = response.products || []

    return { products: products, pagination: response.pagination }
  } catch (err) {
    throw new Error('Failed to fetch data', { cause: err })
  }
}

export default getProducts

import { getSomething } from '@/api/getSomethingFunc'

const getProducts = async () => {
  try {
    const data = await getSomething('products')

    return data
  } catch (error) {
    console.error('failed to fetch', error)
  }
}

export default getProducts

import { getSomething } from '@/api/getSomethingFunc'

const getPosts = async () => {
  try {
    const data = await getSomething('posts')

    return data
  } catch (error) {
    console.error('failed to fetch', error)
  }
}

export default getPosts

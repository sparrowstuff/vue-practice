import * as localComponents from '../components/js/localStorage'

export async function getSomething(query) {
  try {
    const fetchData = await fetch(`https://dummyjson.com/${query}`)
    const response = await fetchData.json()
    // данные возвращаются когда лежат в [ключе]
    const data = response[query] || []

    localComponents.addToLocalStorage(`${query}`, data)

    return data
  } catch (error) {
    console.error(error)
  }
}

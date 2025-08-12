export const getUserProfileUrlImage = async () => {
  try {
    const randomNumber = Math.floor(Math.random() * 1000)
    const response = await fetch(`https://randomuser.me/api/?seed=${randomNumber}`)
    if (!response.ok) throw new Error('Error al obtener la URL')

    const data = await response.json()
    const imageURL = data.results[0].picture.large
    return imageURL
  } catch (error) {
    console.error(error.message)
  }
}

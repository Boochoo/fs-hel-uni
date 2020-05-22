export const setAuth = (user) => {
  try {
    const serialisedUser = JSON.stringify(user)

    window.localStorage.setItem('loggedBlogUser', serialisedUser)
  } catch (error) {
    console.log(error)
  }
}

export const loadAuth = () => {
  try {
    const savedAuth = window.localStorage.getItem('loggedBlogUser')

    if (!savedAuth) return null

    return JSON.parse(savedAuth)
  } catch (error) {
    console.log(error)
  }
}

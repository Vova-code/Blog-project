
export const memorizeCredentials = (credentials) => {
  localStorage.setItem('blogibloga-credentials', JSON.stringify(credentials))
}

export const unvalidateCredentials = () => {
  localStorage.removeItem('blogibloga-credentials')
}

export const retrieveCredentials = () => {
  return JSON.parse(localStorage.getItem('blogibloga-credentials'))
}

export const useAuth = () => {
  const isAuthenticated = useState('auth', () => false)
  const token = useCookie('token')

  const setAuth = (value: boolean) => {
    isAuthenticated.value = value
  }

  const login = (tokenValue: string) => {
    token.value = tokenValue
    setAuth(true)
  }

  const logout = () => {
    token.value = null
    setAuth(false)
  }

  return {
    isAuthenticated,
    login,
    logout,
    setAuth
  }
}
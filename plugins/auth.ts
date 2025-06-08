import { useAuth } from "~/composables/useAuth"

export default defineNuxtPlugin(() => {
  const { setAuth } = useAuth()
  const token = useCookie('token')
  
  // Set initial auth state based on token existence
  if (token.value) {
    setAuth(true)
  }
})
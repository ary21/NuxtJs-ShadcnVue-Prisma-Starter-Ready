import { useAuth } from "~/composables/useAuth"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth()
  
  // Debug logging
  console.log("Current route:", to.path)
  console.log("Auth status:", isAuthenticated.value)

  if (!isAuthenticated.value && to.path !== '/login') {
    return navigateTo('/login')
  }

  if (isAuthenticated.value && to.path === '/login') {
    return navigateTo('/dashboard')
  }
})
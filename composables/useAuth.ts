export const useAuth = () => {
  const isAuthenticated = useState("auth", () => false);
  const token = useCookie("token");
  const userId = useCookie("userId");

  // Check auth state on init
  onMounted(() => {
    if (token.value && !isAuthenticated.value) {
      setAuth(true);
    }
  });

  const setAuth = (value: boolean) => {
    isAuthenticated.value = value;
  };

  const login = (tokenValue: string, id: string) => {
    token.value = tokenValue;
    userId.value = id;
    setAuth(true);
  };

  const logout = () => {
    token.value = null;
    userId.value = null;
    setAuth(false);
  };

  return {
    isAuthenticated,
    userId,
    login,
    logout,
    setAuth,
  };
};

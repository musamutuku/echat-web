export const useAuthStore = defineStore("auth", () => {
  const token = ref("");
  const user = ref(null);
  const authenticated = ref(false);
  
  const setToken = (newToken) => {
    token.value = newToken;
    authenticated.value = true;
    // localStorage.setItem('token', token.value);
  };

  const updateUser = (newUser) => {
    user.value = newUser;
  };

  const deleteUser = () => {
    user.value = null;
  };

  const clearToken = () => {
    token.value = "";
    authenticated.value = false;
    // localStorage.removeItem('token');

  };

  return { token, setToken, clearToken, authenticated, updateUser, deleteUser, user };
});

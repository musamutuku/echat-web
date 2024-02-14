// import { useAuthStore } from "@/stores/myStore";


export default defineNuxtRouteMiddleware((to, from) => {
  const logged = false;
  // const store = useAuthStore();

    if (!logged) {
      return navigateTo(to.fullPath)
    }
    // In a real app you would probably not redirect every route to `/`
    // however it is important to check `to.path` before redirecting or you
    // might get an infinite redirect loop
    else{
      return navigateTo('/index4');
    }   
  })
  
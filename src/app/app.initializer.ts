import { inject } from "@angular/core";
import { AuthStore } from "@/auth/store/auth.store";

export function initializeApp() {
  const store = inject(AuthStore);

  return () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (refreshToken) {
        store.setRefreshToken(refreshToken)
      }

      if (accessToken) {
        store.setAccessToken(accessToken)
        store.fetchCurrentUser()
      }
  }
}

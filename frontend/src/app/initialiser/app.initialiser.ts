import { AuthService } from '../services/auth.service';

export function initializeApp(authService: AuthService) {
  return () => {
    return authService.fetchToken().catch((error) => {
      console.error('Failed to fetch token during initialization:', error);
      return null;
    });
  };
}

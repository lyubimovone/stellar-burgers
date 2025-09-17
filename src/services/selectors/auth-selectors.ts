import { RootState } from '../store';

export const getAuthState = (state: RootState) => state.auth;
export const getAuthUser = (state: RootState) => state.auth.user;
export const isAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const getAuthLoading = (state: RootState) => state.auth.loading;
export const getAuthError = (state: RootState) => state.auth.error;

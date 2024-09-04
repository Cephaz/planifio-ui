import {RootState} from '../../store';

export const selectLogin = (state: RootState) => state.login;
export const selectIsAuthenticated = (state: RootState) => !!state.login.accessToken;
export const selectLoginLoading = (state: RootState) => state.login.isLoading;
export const selectLoginError = (state: RootState) => state.login.error;

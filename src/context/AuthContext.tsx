import React, { createContext, useReducer, useContext } from 'react';
import {
  AuthActionTypes,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  AuthState,
  LoginSuccessAction,
  LoginFailAction,
  LogoutAction,
} from './types/auth';

// Initial state
const initialState = {
  isLoggedIn: false,
  name: null,
  error: null,
};

export const AuthContext = createContext<
  Partial<{
    auth: AuthState;
    dispatch: React.Dispatch<AuthActionTypes>;
  }>
>({});

// Action creators
export function loginSuccess(name: string): LoginSuccessAction {
  return { type: LOGIN_SUCCESS, name };
}

export function loginFail(error: string): LoginFailAction {
  return { type: LOGIN_FAIL, error };
}

export function logout(): LogoutAction {
  return { type: LOGOUT };
}

// Reducer
export function authReducer(
  state: { isLoggedIn: boolean; name: string | null; error: string | null },
  action: AuthActionTypes,
): AuthState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, isLoggedIn: true, name: action.name, error: null };
    case LOGIN_FAIL:
      return { ...state, isLoggedIn: false, name: null, error: action.error };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    default:
      return { ...state };
  }
}

function AuthProvider(props: any) {
  const [auth, dispatch] = useReducer(authReducer, initialState);

  const authData = { auth, dispatch };

  return <AuthContext.Provider value={authData} {...props} />;
}

function useAuthContext() {
  return useContext(AuthContext);
}

export { AuthProvider, useAuthContext };

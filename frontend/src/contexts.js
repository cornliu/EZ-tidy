import { createContext } from 'react'

export const AuthContext = createContext({
  haslogin: false,
  name: '',
  password: '',
  identity: 'Admin'
});

export const SetReloadContext = createContext(false);
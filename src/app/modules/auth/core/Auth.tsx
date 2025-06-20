/* eslint-disable react-refresh/only-export-components */
import { FC, useState, useEffect, createContext, useContext, Dispatch, SetStateAction } from 'react'
import { LayoutSplashScreen } from '../../../../_metronic/layout/core'
import { AuthModel, UserModel } from './_models'
import * as authHelper from './AuthHelpers'
import { getUserByToken } from './_requests'
import { WithChildren } from '../../../../_metronic/helpers'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  logout: () => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => { },
  currentUser: undefined,
  setCurrentUser: () => { },
  logout: () => { },
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>()
  const [isAuthReady, setIsAuthReady] = useState(false)

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedAuth = authHelper.getAuth()
    if (storedAuth) {
      setAuth(storedAuth)
      setCurrentUser(storedAuth.user)
    }
    setIsAuthReady(true)
  }, [])

  const saveAuth = (newAuth: AuthModel | undefined) => {
    setAuth(newAuth)
    if (newAuth) {
      authHelper.setAuth(newAuth)
      setCurrentUser(newAuth.user)
    } else {
      authHelper.removeAuth()
      setCurrentUser(undefined)
    }
  }

  const logout = () => {
    saveAuth(undefined)
  }

  return (
    <AuthContext.Provider value={{ auth, saveAuth, currentUser, setCurrentUser, logout }}>
      {isAuthReady ? children : <LayoutSplashScreen />}
    </AuthContext.Provider>
  )
}

const AuthInit: FC<WithChildren> = ({ children }) => {
  const { auth, logout, setCurrentUser } = useAuth()
  const [isAuthReady, setIsAuthReady] = useState(false)

  useEffect(() => {
    const validateAuth = async () => {
      try {
        if (auth?.token) {
          // Set up auto-logout timer
          const decoded = authHelper.decodeJwt(auth.token)
          if (decoded?.exp) {
            const expirationTime = decoded.exp * 1000
            const timeLeft = expirationTime - Date.now()
            if (timeLeft > 0) {
              setTimeout(logout, timeLeft)

              setIsAuthReady(true)
              return
            }
          }
        }

        // If any condition fails
        logout()
        setIsAuthReady(true)
      } catch (error) {
        console.error('Authentication validation failed:', error)
        logout()
        setIsAuthReady(true)
      }
    }

    validateAuth()
  }, [auth, logout, setCurrentUser])

  return isAuthReady ? <>{children}</> : <LayoutSplashScreen />
}

export { AuthProvider, AuthInit, useAuth }

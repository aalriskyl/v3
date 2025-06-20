/* eslint-disable @typescript-eslint/no-explicit-any */
import {AuthModel} from './_models'

const AUTH_LOCAL_STORAGE_KEY = 'userLogin'
const getAuth = (): AuthModel | undefined => {
  if (!localStorage) {
    return
  }
  

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: AuthModel = JSON.parse(lsValue) as AuthModel
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: AuthModel) => {
  if (!localStorage) {
    return
  }
 try {
    // Save auth object to localStorage
    const lsValue = JSON.stringify(auth);
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue);

    // Example: Find a specific company by ID
    if (auth.companies && auth.companies.length > 0) {
      const specificCompany = auth.companies.find(
        (company) => company.id === "233b117c-1d96-4f4d-8289-6a6691088af6"
      );
      if (specificCompany) {
        localStorage.setItem('company_id', specificCompany.id)
        console.log("Specific company found:", specificCompany);
      } else {
        localStorage.setItem('company_id', auth.companies[0].id)
        console.log("Company not found.");
      }
    }
  } catch (error) {
    console.error("AUTH LOCAL STORAGE SAVE ERROR", error);
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

export const decodeJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const payload = JSON.parse(atob(base64))
    return payload
  } catch (error) {
    console.error('Failed to decode JWT:', error)
    return null
  }
}
export function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
  
  // Request interceptor
  axios.interceptors.request.use(/* existing config */)
  
  // Add response interceptor
  axios.interceptors.response.use(
    (response: any) => response,
    (error: any) => {
      if (error.response?.status === 401) {
        removeAuth()
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  )
}



export {getAuth, setAuth, removeAuth, AUTH_LOCAL_STORAGE_KEY}

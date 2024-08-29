import { useState, useCallback } from 'react'

import { AuthError, InteractionType } from '@azure/msal-browser'
import { useMsal, useMsalAuthentication } from '@azure/msal-react'
import { baseUri } from '../ApiConstants'

import { protectedResources } from '../authConfig'

/**
 * Custom hook to call a web API using bearer token obtained from MSAL
 * @param {PopupRequest} msalRequest
 * @returns
 */

export type ResponseType = {
  message: string
  error: string
  statusCode: number
}

export type APIErrorMessageObjType = {
  statusCode: number
  timestamp: string
  path: string
  response: ResponseType
}

export type ExecuteError = AuthError | Error | unknown

const useFetchWithMsal = () => {
  const { instance } = useMsal()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ExecuteError>(null)
  const [apiError, setApiError] = useState<APIErrorMessageObjType | null>(null)
  const [data, setData] = useState(null)

  //   const activeAccount = instance.getActiveAccount()
  const { result, error: msalError } = useMsalAuthentication(InteractionType.Redirect, {
    scopes: protectedResources.api.scopes.read, // TODO update to final scope
    account: instance.getActiveAccount() || undefined,
    redirectUri: '/',
  })
  /**
   * Execute a fetch request with the given options
   * @param {string} method: GET, POST, PUT, DELETE
   * @param {String} endpoint: The endpoint to call
   * @param {Object} data: The data to send to the endpoint, if any
   * @returns JSON response
   */
  const execute = async (
    method: string,
    endpoint: string,
    data: object | null = null,
    stream = false,
  ) => {
    // force logout user after 15 minutes

    setIsLoading(true)
    if (msalError) {
      setError(msalError)
      setIsLoading(false)
      return
    }
    if (result || import.meta.env.VITE_NODE_ENV === 'test') {
      try {
        const headers = new Headers()
        const bearer = `Bearer ${result?.accessToken}`
        headers.append('Authorization', bearer)
        headers.append('TimeZoneOffSet', `${new Date().getTimezoneOffset()}`)
        headers.append('TimeZone', Intl.DateTimeFormat().resolvedOptions().timeZone)
        if (data && !(data instanceof FormData)) {
          headers.append('Content-Type', 'application/json')
        }
        let body = null
        if (data) {
          if (data instanceof FormData) {
            body = data as FormData
          } else {
            body = JSON.stringify(data)
          }
        }
        const options = {
          method: method,
          headers: headers,
          body: body,
        }

        const urlEndpoint = baseUri + endpoint
        document.body.style.cursor = 'wait'
        const response = await fetch(urlEndpoint, options)
        if (!response.ok) {
          document.body.style.cursor = 'default'
          // eslint-disable-next-line no-console
          console.error(`Network response was unsuccesful. Status: ${response.status}`)
          const errorResponse = await response.json()
          const strErrObj = JSON.stringify(errorResponse)
          throw new Error(strErrObj)
        }
        document.body.style.cursor = 'default'

        if (stream) {
          setIsLoading(false)
          return await response.blob()
        }
        const jsonResponse = await response.json()
        setData(jsonResponse)

        setIsLoading(false)
        return jsonResponse
      } catch (e: unknown) {
        document.body.style.cursor = 'default'
        try {
          const error = (e as Error).message
          // handle multiple session error, kick expired session out
          const apiReturnError = JSON.parse(error) as APIErrorMessageObjType
          if (`${JSON.stringify(apiReturnError)}`.includes('Multiple session') || !result) {
            instance.logoutRedirect({ postLogoutRedirectUri: '/logout-multiple-sessions' })
          }
          setApiError(apiReturnError)
          setError(apiReturnError)
        } catch (e) {
          setError(e)
        }
        setIsLoading(false)
      }
    }
  }

  return {
    isLoading,
    error,
    data,
    apiError,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    execute: useCallback(execute, [result, msalError]), // to avoid infinite calls when inside a `useEffect`
  }
}

export default useFetchWithMsal

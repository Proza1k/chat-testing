import { getAuthToken } from 'src/helpers/auth'

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE'
}

export const getRequestOptions = <T>(method: RequestMethod, body?: T) => {
  switch (method) {
    case RequestMethod.GET:
      return {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          authorization: `Bearer ${getAuthToken()}`
        }
      }

    case RequestMethod.POST:
      return {
        method,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          authorization: `Bearer ${getAuthToken()}`
        },
        body: JSON.stringify({
          payload: body
        })
      }
  }
}

export const fetchJson = async <Props, Result>(url: string, method: RequestMethod, body?: Props): Promise<Result> => {
  const response = await fetch(url, getRequestOptions(method, body))
  const result = await response.json()

  return result
}

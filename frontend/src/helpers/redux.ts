import { createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Status } from 'src/types/status'
import { fetchJson, RequestMethod } from 'src/helpers/request'
import { ResponseServiceData } from 'src/types/response'

export const setError = <State>(state: State) => ({
  ...state,
  payload: null,
  status: Status.ERROR
})

export const setLoading = <State>(state: State) => ({
  ...state,
  status: Status.LOADING
})

export const setSuccess = <State, Action>(state: State, action: PayloadAction<Action>) => {
  const result = action.payload as ResponseServiceData<Action>

  return {
    ...state,
    payload: result.payload ?? null,
    status: Status.SUCCESS
  }
}

export type AsyncThunkParams<ResultPayload, Callback> = {
  thunk: string
  route: string
  method: RequestMethod
  callback?: (data: ResultPayload) => Callback | null
}

export const asyncThunk = <Payload, ResultPayload, Callback>(
  params: AsyncThunkParams<ResponseServiceData<ResultPayload>, Callback>
) => {
  const { thunk, route, method, callback } = params

  return createAsyncThunk<ResponseServiceData<ResultPayload>, Payload | void>(
    thunk,
    async (_payload, { rejectWithValue }) => {
      try {
        const data: ResponseServiceData<ResultPayload> = await fetchJson(route, method, _payload)
        if (data.status === Status.SUCCESS) {
          if (callback) {
            callback(data)
          }

          return data
        } else {
          throw new Error(data.message)
        }
      } catch (error) {
        rejectWithValue(null)
        console.error(error)
        throw error
      }
    }
  )
}

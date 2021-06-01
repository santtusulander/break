import { AxiosRequestConfig } from "axios";
import useSWR, { SWRResponse } from "swr";
import { State, useAppState } from "../../state";

export default function useSWRWithState<Data = any, Error = any>(key: string, config?: AxiosRequestConfig): SWRResponse<Data, Error> {

  const res = useSWR([key, config])

  const [state, reduceState] = useAppState()
  console.log('updated')
  if (res.error && !state.asyncErrors.findIndex((e) => e.key === key)) {

    reduceState<State['asyncErrors']>('asyncErrors', (asyncErrors) => ([...asyncErrors, {status: 500, description: 'Oops', key}]))
  }

  return res
}
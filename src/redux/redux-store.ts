import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware, Action } from 'redux'
import CurrenciesReducer from './reducer'

let reducers = combineReducers({
  currencies: CurrenciesReducer,
})

export type AppStateType = ReturnType<typeof reducers>

export type InferActionTypes<T> = T extends {
  [key: string]: (...args: any[]) => infer U
}
  ? U
  : never
export type BaseTThunk<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>

let store = createStore(reducers, applyMiddleware(thunkMiddleware))
// @ts-ignore
window.store = store

export default store

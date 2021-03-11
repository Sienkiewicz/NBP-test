import thunkMiddleware, { ThunkAction } from 'redux-thunk'
import { createStore, combineReducers, applyMiddleware, Action } from 'redux'
import reducer from './reducer'

let reducers = combineReducers({
  currency: reducer,
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
  null,
  A
>

let store = createStore(reducers, applyMiddleware(thunkMiddleware))
// @ts-ignore
window.store = store

export default store

import { CurrencyFull, CurrencyMid, RateMid } from './../type.d'
import { BaseTThunk, InferActionTypes } from './redux-store'

let initialState = {
  fullListOfCurrencies: undefined as undefined | CurrencyMid,
  arrOfUserCurrencies: [] as CurrencyFull[],
  isFetchingFullList: false,
  requestedCurrencies: [] as RateMid[],
}

const CurrenciesReducer = (
  state = initialState,
  action: ActionTypes
): InitialStateType => {
  switch (action.type) {
    case 'SM/USERS/SET_FULL_LIST_OF_CURRENCIES':
      return {
        ...state,
        fullListOfCurrencies: action.payload.data,
      }

    case 'SM/USERS/TOGGLE_IS_FETCHING_FULL_LIST':
      return {
        ...state,
        isFetchingFullList: action.payload.isFetching,
      }

    case 'SM/USERS/EDIT_CURRENCIES':
      return {
        ...state,
        requestedCurrencies: (function () {
          if (state.fullListOfCurrencies) {
            return state.fullListOfCurrencies.rates.filter((el) => {
              return action.payload.currencies.some((cur) => cur === el.code)
            })
          }
          return []
        })(),
      }

    default:
      return state
  }
}

export const actions = {
  setFullListOfCurrencies: (data: CurrencyMid) =>
    ({
      type: 'SM/USERS/SET_FULL_LIST_OF_CURRENCIES',
      payload: { data },
    } as const),
  setArrOfUserCurrencies: (arrOfUserCurrencies: CurrencyFull) =>
    ({
      type: 'SM/USERS/SET_ARR_OF_USER_CURRENCIES',
      payload: { arrOfUserCurrencies },
    } as const),
  editCurrencies: (currencies: string[]) =>
    ({
      type: 'SM/USERS/EDIT_CURRENCIES',
      payload: { currencies },
    } as const),
  toggleIsFetchingFullList: (isFetching: boolean) =>
    ({
      type: 'SM/USERS/TOGGLE_IS_FETCHING_FULL_LIST',
      payload: { isFetching },
    } as const),
}

export const getFullListOfCurrencies = (): TThunk => {
  return async (dispatch) => {
    dispatch(actions.toggleIsFetchingFullList(true))
    try {
      await fetch('http://api.nbp.pl/api/exchangerates/tables/a/')
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          dispatch(actions.setFullListOfCurrencies(data[0]))
        })
    } catch (err) {
      console.error(err)
    }

    dispatch(actions.toggleIsFetchingFullList(false))
  }
}

export default CurrenciesReducer

export type InitialStateType = typeof initialState
export type ActionTypes = InferActionTypes<typeof actions>
export type TThunk = BaseTThunk<ActionTypes>

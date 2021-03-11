import { CurrencyFull, CurrencyMid } from './../type.d';
import { BaseTThunk, InferActionTypes } from './redux-store'

let initialState = {
  fullListOfCurrencies: CurrencyMid,
  arrOfUserCurrencies: [] as CurrencyFull[],
  preferCurrencies: ['usd', 'uah', 'pl'],
  isFetchingFullList: false,
  isFetchingSeparateCurrency: false,
}

const usersReducer = (
  state = initialState,
  action: ActionTypes
): InitialStateUsersType => {
  switch (action.type) {
    case 'SM/USERS/SET_USERS':
      return {
        ...state,
        users: action.payload.users,
      }

    case 'SM/USERS/TOGGLE_IS_FETCHING':
      return {
        ...state,
        isFetching: action.payload.isFetching,
      }

    case 'SM/USERS/ADD_USER':
      return {
        ...state,
        users: [
          ...state.users,
          {
            id: action.payload.id,
            name: action.payload.name,
            username: action.payload.username || action.payload.name,
            email: action.payload.email,
            address: {
              city: action.payload.city || '---',
            },
          },
        ],
      }

    case 'SM/USERS/EDIT_USER':
      return {
        ...state,
        users: state.users.map((u) => {
          if (u.id === action.payload.id) {
            return {
              ...u,
              name: action.payload.name,
              username: action.payload.username || action.payload.name,
              email: action.payload.email,
              address: {
                city: action.payload.city || '---',
              },
            }
          }
          return u
        }),
      }

    case 'SM/USERS/DELETE_USER':
      return {
        ...state,
        users: state.users.filter((u) => u.id !== action.payload.id),
      }

    case 'SM/USERS/SORT_USERS':
      return {
        ...state,
        users: (() => {
          const sort = state.users.sort((a, b) => {
            const x = a.name.toLowerCase()
            const y = b.name.toLowerCase()
            return x > y ? 1 : x < y ? -1 : 0
          })
          if (action.payload.direction) {
            const arr = sort.reverse()
            return arr
          } else {
            return sort
          }
        })(),
      }

    default:
      return state
  }
}

export const actionsOfUsers = {
  setUsers: (users: User[]) =>
    ({ type: 'SM/USERS/SET_USERS', payload: { users } } as const),
  toggleIsFetching: (isFetching: boolean) =>
    ({ type: 'SM/USERS/TOGGLE_IS_FETCHING', payload: { isFetching } } as const),
}

export const getFullListOfCurrencies = (): TThunk => {
  return async (dispatch) => {
    dispatch(actionsOfUsers.toggleIsFetching(true))
    await fetch('http://api.nbp.pl/api/exchangerates/tables/a/')
      .then((response) => {
        return response.json()
      })
      .then((data: CurrencyMid) => {
        dispatch(actionsOfUsers.setUsers(data))
      })
    dispatch(actionsOfUsers.toggleIsFetching(false))
  }
}

export default usersReducer

export type InitialStateUsersType = typeof initialState
type ActionTypes = InferActionTypes<typeof actionsOfUsers>
type TThunk = BaseTThunk<ActionTypes>

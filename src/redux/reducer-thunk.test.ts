import { AppStateType } from './redux-store'
import { CurrencyFull, CurrencyMid, RateMid } from '../type'
import CurrenciesReducer, {
  actions,
  getFullListOfCurrencies,
  InitialStateType,
  TThunk,
  ActionTypes,
} from './reducer'

import configureMockStore from 'redux-mock-store'
import thunk, { ThunkDispatch } from 'redux-thunk'
import fetchMock from 'fetch-mock'
import expect from 'expect' // You can use any testing library

let data = [
  {
    table: 'A',
    no: '049/A/NBP/2021',
    effectiveDate: '2021-03-12',
    rates: [
      { currency: 'bat (Tajlandia)', code: 'THB', mid: 0.1251 },
      { currency: 'dolar amerykański', code: 'USD', mid: 3.8521 },
      { currency: 'dolar australijski', code: 'AUD', mid: 2.9839 },
      { currency: 'dolar Hongkongu', code: 'HKD', mid: 0.4962 },
      { currency: 'dolar kanadyjski', code: 'CAD', mid: 3.0669 },
      { currency: 'dolar nowozelandzki', code: 'NZD', mid: 2.7642 },
      { currency: 'dolar singapurski', code: 'SGD', mid: 2.86 },
      { currency: 'euro', code: 'EUR', mid: 4.5909 },
      { currency: 'forint (Węgry)', code: 'HUF', mid: 0.01253 },
      { currency: 'frank szwajcarski', code: 'CHF', mid: 4.1373 },
      { currency: 'funt szterling', code: 'GBP', mid: 5.3591 },
      { currency: 'hrywna (Ukraina)', code: 'UAH', mid: 0.1389 },
    ],
  },
]

const middlewares = [thunk]
const mockStore = configureMockStore<
  InitialStateType,
  ThunkDispatch<AppStateType, any, ActionTypes>
>(middlewares)

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  it('check did actions run when fetching currencies has been done', () => {
    fetchMock.getOnce('http://api.nbp.pl/api/exchangerates/tables/a/', data)

    const expectedActions = [
      actions.toggleIsFetchingFullList(true),
      actions.setFullListOfCurrencies(data[0]),
      actions.toggleIsFetchingFullList(false),
    ]
    const store = mockStore({
      fullListOfCurrencies: undefined,
      arrOfUserCurrencies: [],
      isFetchingFullList: false,
      requestedCurrencies: [],
    })

    return store.dispatch(getFullListOfCurrencies()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

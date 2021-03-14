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

let data = {
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
}

describe('Full list of currencies', () => {
  let action = actions.setFullListOfCurrencies(data)
  let state: InitialStateType = {
    fullListOfCurrencies: undefined,
    arrOfUserCurrencies: [],
    isFetchingFullList: false,
    requestedCurrencies: [],
  }
  let newState = CurrenciesReducer(state, action)

  test('should be added', () => {
    expect(newState.fullListOfCurrencies?.rates.length).toBe(12)
  })
  test('should be equal to example object', () => {
    expect(newState.fullListOfCurrencies?.rates[0]).toEqual(data.rates[0])
    expect(newState.fullListOfCurrencies?.rates[1]).toEqual(data.rates[1])
    expect(newState.fullListOfCurrencies?.rates[2]).toEqual(data.rates[2])
  })
})

describe('Edit currencies', () => {
  let currencies = ['THB', 'USD']
  let action = actions.editCurrencies(currencies)
  let state: InitialStateType = {
    fullListOfCurrencies: data,
    arrOfUserCurrencies: [],
    isFetchingFullList: false,
    requestedCurrencies: [],
  }
  let newState = CurrenciesReducer(state, action)

  test('should added array of currencies', () => {
    expect(newState.requestedCurrencies.length).toBe(2)
  })
  test('should be equal to example object', () => {
    expect(newState.requestedCurrencies[0]).toEqual(data.rates[0])
    expect(newState.requestedCurrencies[1]).toEqual(data.rates[1])
  })
})


import React from 'react'
import './App.css'
import TableOfCurrencies from './components/TableOfCurrencies'
import { Provider } from 'react-redux'
import store from './redux/redux-store'

function App() {

  return (
    <Provider store={store}>
      <TableOfCurrencies/>
    </Provider>
  )
}

export default App

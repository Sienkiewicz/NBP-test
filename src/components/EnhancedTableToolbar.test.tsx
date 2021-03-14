import '@testing-library/jest-dom'
// NOTE: jest-dom adds handy assertions to Jest and is recommended, but not required

import * as React from 'react'
import { render, fireEvent, screen, waitFor } from '@testing-library/react'
import { EnhancedTableToolbar } from './EnhancedTableToolbar'
import { Provider } from 'react-redux'
import store from '../redux/redux-store'

test('shows the children when the addButton is clicked', async () => {
  const fn = jest.fn()
  render(
    <Provider store={store}>
      <EnhancedTableToolbar numSelected={0} editArrCurrencies={fn} />
    </Provider>
  )

  expect(screen.getByText('Your currencies')).toBeInTheDocument()
  expect(screen.getByTestId('add-icon')).toBeInTheDocument()

  fireEvent.click(screen.getByTestId('add-icon'))
  await waitFor(() =>
    expect(
      screen.getByTestId('alert-dialog-chosen-currencies')
    ).toBeInTheDocument()
  )

  expect(
    screen.getByTestId('alert-dialog-chosen-currencies')
  ).toBeInTheDocument()
})

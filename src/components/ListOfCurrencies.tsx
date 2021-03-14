import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import { RateMid } from '../type'
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../redux/redux-store'
import { actions } from '../redux/reducer'
import { isSelected } from '../utils/help'
import { OverlaySpinner } from './OverlaySpinner'

const ListOfCurrencies = React.memo(
  ({
    open,
    handleClose,
    rates,
  }: {
    open: boolean
    handleClose(): void
    rates: undefined | RateMid[]
  }) => {
    const dispatch = useDispatch()
    const isFetching = useSelector(
      (state: AppStateType) => state.currencies.isFetchingFullList
    )
    const currencies = useSelector(
      (state: AppStateType) => state.currencies.requestedCurrencies
    )
    const [state, setState] = React.useState<string[]>([])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => {
        if (event.target.checked) {
          return [...prevState, event.target.name]
        } else {
          const newState = prevState.filter(
            (currency) => currency !== event.target.name
          )
          return newState
        }
      })
    }

    const editArrCurrencies = () => {
      dispatch(actions.editCurrencies(state))
      handleClose()
    }

    useEffect(() => {
      setState(currencies.map((el) => el.code))
    }, [currencies])

    return (
      <>
        {isFetching ? (
          <OverlaySpinner isFetching={isFetching} />
        ) : (
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='alert-dialog-chosen-currencies'
            aria-describedby='alert-dialog-chosen-currencies'
          >
            <DialogTitle
              id='alert-dialog-chosen-currencies'
              data-testid='alert-dialog-chosen-currencies'
            >
              Choose currencies
            </DialogTitle>
            <DialogContent>
              <FormControl component='fieldset'>
                {rates?.map((el, i) => {
                  const isItemSelected = isSelected(el.code, state)
                  return (
                    <FormGroup key={i}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isItemSelected}
                            onChange={handleChange}
                            name={el.code}
                          />
                        }
                        label={el.code}
                      />
                    </FormGroup>
                  )
                })}
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button onClick={editArrCurrencies} color='primary' autoFocus>
                Add
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </>
    )
  }
)
export default ListOfCurrencies

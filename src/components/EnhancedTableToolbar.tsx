import React, { FC } from 'react'
import clsx from 'clsx'
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import { Fab } from '@material-ui/core'
import ListOfCurrencies from './ListOfCurrencies'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../redux/redux-store'
import { getFullListOfCurrencies } from '../redux/reducer'

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  })
)

type Props = {
  numSelected: number
  editArrCurrencies(): void
}

export const EnhancedTableToolbar: FC<Props> = React.memo(
  ({ numSelected, editArrCurrencies }) => {
    const classes = useToolbarStyles()
    const rates = useSelector(
      (state: AppStateType) => state.currencies.fullListOfCurrencies?.rates
    )
    const [open, setOpen] = React.useState(false)
    const dispatch = useDispatch()

    const handleClickOpen = () => {
      setOpen(true)
      !rates && dispatch(getFullListOfCurrencies())
    }

    const handleClose = () => {
      setOpen(false)
    }

    return (
      <>
        <ListOfCurrencies rates={rates} open={open} handleClose={handleClose} />
        <Toolbar
          className={clsx(classes.root, {
            [classes.highlight]: numSelected > 0,
          })}
        >
          {numSelected > 0 ? (
            <Typography
              className={classes.title}
              color='inherit'
              variant='subtitle1'
              component='div'
            >
              {numSelected} selected
            </Typography>
          ) : (
            <Typography
              className={classes.title}
              variant='h6'
              id='tableTitle'
              component='div'
            >
              Your currencies
            </Typography>
          )}
          {numSelected > 0 ? (
            <Tooltip title='Delete'>
              <IconButton aria-label='delete'>
                <DeleteIcon onClick={editArrCurrencies} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title='Filter list'>
              <Fab
                data-testid='add-icon'
                onClick={handleClickOpen}
                size='small'
                color='primary'
              >
                <AddIcon />
              </Fab>
            </Tooltip>
          )}
        </Toolbar>
      </>
    )
  }
)

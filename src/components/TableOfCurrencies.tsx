import React, { FC, useCallback } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import { EnhancedTableToolbar } from './EnhancedTableToolbar'
import { EnhancedTableHead } from './EnhancedTableHead'
import { Data, Order } from '../type'
import { getComparator, stableSort } from '../utils/sort'
import { useDispatch, useSelector } from 'react-redux'
import { AppStateType } from '../redux/redux-store'
import { isSelected } from '../utils/help'
import { actions } from '../redux/reducer'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 550,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    info: {
      color: 'red',
      textAlign: 'center',
    },
  })
)

const TableOfCurrencies: FC = () => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Data>('code')
  const [selected, setSelected] = React.useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const rates = useSelector(
    (state: AppStateType) => state.currencies.requestedCurrencies
  )

  const handleRequestSort = useCallback(
    (event: React.MouseEvent<unknown>, property: keyof Data) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
    },
    [orderBy, order]
  )

  const handleSelectAllClick = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        const newSelecteds = rates.map((n) => n.code)
        setSelected(newSelecteds)
        return
      }
      setSelected([])
    },
    [rates]
  )

  const handleClick = (
    event: React.FormEvent<HTMLTableRowElement>,
    name: string
  ) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage)
  }, [])

  const handleChangeRowsPerPage = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setRowsPerPage(parseInt(event.target.value, 10))
      setPage(0)
    },
    []
  )

  const emptyRows = rates
    ? rowsPerPage - Math.min(rowsPerPage, rates.length - page * rowsPerPage)
    : 0

  const editArrCurrencies = useCallback(() => {
    const arr = (): string[] => {
      return rates
        .filter((el) => {
          return !selected.some((code) => code === el.code)
        })
        .map((el) => el.code)
    }
    dispatch(actions.editCurrencies(arr()))
    setSelected([])
  }, [rates, selected, dispatch])

  const createSortHandler = useCallback(
    (property: keyof Data, event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property)
    },
    [handleRequestSort]
  )

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          editArrCurrencies={editArrCurrencies}
          numSelected={selected.length}
        />
        {!rates.length ? (
          <div className={classes.info}>You didn't choose any currencies</div>
        ) : null}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size='medium'
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={createSortHandler}
              rowCount={rates ? rates.length : 1}
            />
            {rates.length ? (
              <TableBody>
                {stableSort(rates, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => {
                    const isItemSelected = isSelected(row.code, selected)
                    const labelId = `enhanced-table-checkbox-${index}`

                    return (
                      <TableRow
                        hover
                        onClick={(event) => handleClick(event, row.code)}
                        role='checkbox'
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.currency}
                        selected={isItemSelected}
                      >
                        <TableCell padding='checkbox'>
                          <Checkbox
                            checked={isItemSelected}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </TableCell>
                        <TableCell
                          component='th'
                          id={labelId}
                          scope='row'
                          padding='none'
                        >
                          {row.currency}
                        </TableCell>
                        <TableCell>{row.code}</TableCell>
                        <TableCell align='right'>{row.mid}</TableCell>
                      </TableRow>
                    )
                  })}
                {emptyRows > 0 ? (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                ) : null}
              </TableBody>
            ) : null}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component='div'
          count={rates ? rates.length : 1}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  )
}

export default TableOfCurrencies

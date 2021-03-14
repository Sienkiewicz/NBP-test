import { Backdrop, CircularProgress, createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { FC } from 'react'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  })
)

type Props = {
  isFetching: boolean
}

export const OverlaySpinner: FC<Props> = React.memo(({ isFetching }) => {
  const classes = useStyles()
  return (
    <Backdrop className={classes.backdrop} open={isFetching}>
      <CircularProgress color='inherit' />
    </Backdrop>
  )
})

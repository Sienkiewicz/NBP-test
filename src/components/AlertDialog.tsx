import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'

export default React.memo(function AlertDialog({
  handleTogglePrompt,
  openPrompt,
  editArrCurrencies,
}: {
  openPrompt: boolean
  handleTogglePrompt(): void
  editArrCurrencies(): void
}) {
  return (
    <Dialog
      open={openPrompt}
      onClose={handleTogglePrompt}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleTogglePrompt} color='primary'>
          No
        </Button>
        <Button onClick={editArrCurrencies} color='primary' autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  )
})

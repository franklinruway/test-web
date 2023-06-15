import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Snackbar } from '@mui/material'

const AlertSnackBar: React.FC<any> = (props: any) => {
  const {
    open,
    type = 'error',
    message,
    timeHideDuration = 3000,
    handleClose = () => {},
    vertical = 'bottom',
    horizontal = 'center',
  } = props

  const internalHandleClose = (event: any, reason: any) => {
    if (reason === 'clickaway') {
      return
    }

    handleClose()
  }
  
  return (
    <Snackbar
      anchorOrigin={{vertical, horizontal}}
      open={open}
      autoHideDuration={timeHideDuration}
      onClose={internalHandleClose}
    >
      <Alert onClose={handleClose} severity={type}>
        <div dangerouslySetInnerHTML={{__html: message}} />
      </Alert>
    </Snackbar>
  )
}

AlertSnackBar.propTypes = {
  open: PropTypes.bool.isRequired,
}

export default AlertSnackBar
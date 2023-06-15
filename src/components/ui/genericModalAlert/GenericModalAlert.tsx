import React from 'react'
import {Modal, Typography, Button} from '@mui/material'
import PropTypes from 'prop-types'

/* import useStyles from './GenericModalAlert.styles' */

const isJsxElement = (element: any, fallback = (arg: any) => null) => {
  
  if (React.isValidElement(element)) return element
  
  return fallback(element)
}

const titleElement = (el: any) => (
  <Typography variant="h2">{el}</Typography>
);

const subtitleElement = (el: any) => (
  <Typography align="center" variant="h3">{el}</Typography>
);

const GenericModalAlert: React.FC<any> = ({
  title,
  subtitle,
  description,
  icon = null,
  okText,
  cancelText,
  onClickOk,
  onClickCancel,
  customActions,
  children,
  ...ModalProps
}) => {
  
  return (
    <Modal {...ModalProps} >
      <div style={{
        background: 'white',
        top: '50%',
        left: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        boxShadow: '5px',
        width: '30rem',
        minHeight: '15rem',
        borderRadius: '0.6875rem',
        padding: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div style={{
          textAlign: 'center',
          display: 'grid',
          gridRowGap: '1.25rem',
          justifyItems: 'center',
          width: '100%'
        }}>
          {icon && <div>{icon}</div>}
          {title && <div>
            {isJsxElement(titleElement(title))}
          </div>}
          {subtitle && (
            <div>
              {isJsxElement(subtitleElement(subtitle))}
            </div>
          )}
          {description && (
            <div>
              {isJsxElement((description: any, el: any) => (
                <Typography align="left" >{el}</Typography>
              ))}
            </div>
          )}
          {children}
          {(okText || cancelText) && (
            <div style={{
              marginTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                display: 'grid',
                gridAutoFlow: 'column',
                gridGap: '1.75rem',
                width: '100%',
                justifyContent: 'center',
              }}>
                {cancelText && (
                  <Button
                    fullWidth
                    onClick={onClickCancel}
                    variant="outlined"
                    color='primary'
                    size="large"
                    data-testid="backo-modal-cancelButton"
                    sx={{
                      borderRadius: 12,
                      fontSize: 16,
                      width: 187,
                      height:50,
                    }}
                  >
                    {cancelText}
                  </Button>
                )}
                {okText && (
                  <Button
                    fullWidth
                    onClick={onClickOk}
                    variant="contained"
                    size="large"
                    data-testid="backo-modal-okButton"
                    sx={
                      {
                        backgroundColor: 'red',
                        color: '#fff',
                        borderRadius: 12,
                        fontSize: 16,
                        width: 187,
                        height:50,
                        '&:hover': {
                            backgroundColor: '#eb1a1ac2',
                          },
                      }
                    }
                  >
                    {okText}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

GenericModalAlert.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  okText: PropTypes.string,
  cancelText: PropTypes.string,
  icon: PropTypes.element,
  onClickOk: PropTypes.func,
  onClickCancel: PropTypes.func,
  ModalProps: PropTypes.shape({}),
  children: PropTypes.node,
}

export default GenericModalAlert

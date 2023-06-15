import {useDispatch, useSelector} from 'react-redux'


import { closeInstanceModal, modalSelector } from '../../../stateManagement/slices/instanceModalSlice'
import GenericModalAlert from '../../ui/genericModalAlert/GenericModalAlert'

const InstanceModal: React.FC = () => {
  const dispatch = useDispatch()
  const {
    isOpen,
    meta: {
      onClickOk,
      onClickCancel,
      content,
      title,
      description,
      okText,
      cancelText,
      subtitle,
    },
  } = useSelector(modalSelector)

  return (
    <GenericModalAlert
      open={isOpen}
      title={title}
      subtitle={subtitle}
      description={description}
      okText={okText}
      cancelText={cancelText}
      onClickOk={onClickOk}
      onClickCancel={(e: any) => {
        onClickCancel(e)
        dispatch(closeInstanceModal())
      }}
    >
      {content}
    </GenericModalAlert>
  )
}

export default InstanceModal

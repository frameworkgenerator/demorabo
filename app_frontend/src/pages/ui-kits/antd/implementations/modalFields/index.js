/* eslint-disable */
import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import DevelopersTableSmall from '../../../../../components/kit/widgets/Tables/implementations/DevelopersTableSmall'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

const { confirm } = Modal

const mapStateToProps = ({ dispatch }) => ({
  dispatch,
})

const WorkItemModal = ({ dispatch }) => {
  const [getVisible, setVisible] = useState(false)
  const [getRedirect, setRedirect] = useState(false)

  const showModal = () => {
    setVisible(true)
  }

  const enableRoute = () => {
    setRedirect(true)
  }

  const openWorkItem = () => {
    dispatch({
      type: 'service/GET_FIELDS',
    })
    if (getRedirect === true) {
      console.log('hiepederpiep hoera')
      sessionStorage.setItem('datasetId', '1')
      dispatch({
        type: 'service/GET_FIELDS',
      })
      sessionStorageStoreDataSetId()
      return (
        <Redirect
          to={{
            pathname: '/apps/fields-management',
            state: { datasetId: '1' },
          }}
        />
      )
    }
  }

  const handleOk = () => {
    setVisible(false)
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure delete this task?',
      content: 'Some descriptions',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK')
      },
      onCancel() {
        console.log('Cancel')
      },
    })
  }

  const sessionStorageStoreDataSetId = () => {
    console.log('was here')
    sessionStorage.setItem('datasetId', 1)
    console.log(sessionStorage.getItem('datasetId'))
  }

  return (
    <div>
      {openWorkItem()}
      <div className="mb-1">
        <Button type="primary" onClick={showModal} className="mb-1 mr-1">
          Open
        </Button>
        <Button onClick={showDeleteConfirm} type="dashed" className="mb-1 mr-1">
          Delete
        </Button>
      </div>
      <Modal title={'Workitem '} visible={getVisible} onCancel={handleCancel} footer={[]}>
        <Button type="primary" onClick={enableRoute} className="mb-3 mr-3">
          Edit
        </Button>
        <div>
          <DevelopersTableSmall />
        </div>
      </Modal>
    </div>
  )
}
export default withRouter(connect(mapStateToProps)(WorkItemModal))

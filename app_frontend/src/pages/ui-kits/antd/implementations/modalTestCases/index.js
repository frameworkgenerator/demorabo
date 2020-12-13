/* eslint-disable */
import React from 'react'
import { Modal, Button, Input } from 'antd'

const { confirm } = Modal

class WorkItemModal extends React.Component {
  state = { visible: false, redirect: false }

  showModal = () => {
    this.setState({
      visible: true,
    })
  }

  enableRoute = () => {
    this.setState({
      redirect: true,
    })
  }

  handleOk = () => {
    this.setState({
      visible: false,
    })
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  showDeleteConfirm = () => {
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

  sessionStorageStoreProjectId = () => {
    sessionStorage.setItem('projectId', 1)
  }

  render() {
    return (
      <div>
        <div className="mb-1">
          <Button type="primary" onClick={this.showModal} className="mb-1 mr-1">
            Info
          </Button>
        </div>
        <Modal
          title={'Information'}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <Input placeholder="Enter user story" />
          <br />
          <br />
          <Input placeholder="Enter requirement" />
          <br />
          <br />
          <Button type="primary" onClick={this.handleOk} className="mb-3 mr-3">
            Save
          </Button>
        </Modal>
      </div>
    )
  }
}

export default WorkItemModal

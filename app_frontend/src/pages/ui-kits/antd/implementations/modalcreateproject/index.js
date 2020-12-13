/* eslint-disable */
import React from 'react'
import { Modal, Button, Input, Form } from 'antd'

const { confirm } = Modal

class WorkItemModal extends React.Component {
  constructor(props) {
    super(props)
  }

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

  handleOk = data => {
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

  validateMessages = () => {
    return {
      required: '${label} is required!',
    }
  }

  layout = () => {
    return {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    }
  }

  sessionStorageStoreProjectId = () => {
    sessionStorage.setItem('projectId', 1)
  }

  render() {
    return (
      <div>
        <div className="mb-1">
          <Button type="primary" onClick={this.showModal} className="mb-1 mr-1">
            Create
          </Button>
        </div>
        <Modal
          title={'Create Project'}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[]}
        >
          <div>
            <Form
              {...this.layout}
              name="nest-messages"
              onFinish={this.handleOk}
              validateMessages={this.validateMessages}
            >
              <Form.Item
                name={['data', 'name']}
                label="Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={['data', 'description']}
                label="Description"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item
                name={['data', 'lead']}
                label="Lead"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{ ...this.layout.wrapperCol, offset: 8 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </div>
    )
  }
}

export default WorkItemModal

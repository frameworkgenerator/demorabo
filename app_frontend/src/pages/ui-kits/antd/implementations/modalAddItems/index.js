/* eslint-disable */
import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Button, Select } from 'antd'
import { Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
const { confirm } = Modal
import formItems from './FormItems.json'
import options from './OptionItems.json'

const mapStateToProps = ({ service,dispatch }) => ({
  dataSets: service.dataSets,
  dataSetsTop: service.dataSetsTop,
  dispatch,
})

const WorkItemModal = ({ dataSets, dataSetsTop, setNewObject,setLatestObject, dispatch }) => {
  const [visible, setVisible] = useState(false)
  const [dataSetId, setDataSetId] = useState('')
  const [redirect, setRedirect] = useState(false)
  const [data, setData] = useState(dataSets)

  useEffect(() => {
    setData(dataSets)
  }, [dataSets])

  useEffect(() => {
    setLatestObject(dataSetsTop)
  }, [dataSetsTop])

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  }
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  }

  const { Option } = Select

  const onFinish = async values => {
    const projectId = localStorage.getItem('projectId')
    console.log('grrrrx')
    console.log(JSON.stringify(dataSetsTop))
    const newDataObject = {
      "datasetcontext": {
        "blocked": true,
        "flag": true,
        "owner": "string",
        "position": 0,
        "selected": true,
        "status": values.status
      },
      "description": values.description,
      "name": values.name,
      "path": values.path,
      "projectId": projectId,
      "selector": values.selector,
      "type": values.type
    }
    setNewObject(newDataObject)
    setVisible(false)
    dispatch({
      type: 'service/GET_DATASETSTOP',
    })
  }

  // const onBlockedChange = value => {
  //   console.log(value)
  // }

  const showModal = () => {
    setVisible(true)
  }

  const enableRoute = () => {
    setRedirect(true)
  }

  const openWorkItem = () => {
    if (redirect === true) {
      sessionStorageStoreDataSetId()
      return (
        <Redirect
          to={{
            pathname: '/apps/fields-management',
            state: { datasetId: '123' },
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
          Create
        </Button>
      </div>
      <Modal title={'Workitem ' + dataSetId} visible={visible} onCancel={handleCancel} footer={[]}>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          {formItems.map(item => (
            <Form.Item
              name={item.name}
              label={item.label}
              rules={[
                {
                  required: item.required,
                },
              ]}
            >
              <Input />
            </Form.Item>
          ))}
          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select status" allowClear>
              {options.map(item => (
                <Option value={item}>{item}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
export default withRouter(connect(mapStateToProps)(WorkItemModal))

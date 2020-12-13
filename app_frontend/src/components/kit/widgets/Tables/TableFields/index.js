/* jshint sub:true */
import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css'
import { Table, Input, InputNumber, Popconfirm, Form, Button, Tooltip, Space } from 'antd'
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  FolderOpenOutlined,
  SaveOutlined,
  UndoOutlined,
} from '@ant-design/icons'

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const TableWide = ({
  dataSource,
  dispatch,
  user,
  columnDefinitions,
  dataObject,
  callMethod,
  entity,
}) => {
  const [form] = Form.useForm()
  const [data, setData] = useState(dataSource)
  const [editingKey, setEditingKey] = useState('')
  const [open, setOpen] = useState(false)
  const [getChildKey, setChildKey] = useState('')

  useEffect(() => {
    setData(dataSource)
  }, [dataSource])

  const isEditing = record => record.id === editingKey

  const edit = record => {
    delete dataObject.id
    form.setFieldsValue({
      dataObject,
      ...record,
    })
    setEditingKey(record.id)
  }

  const deleteRow = record => {
    console.log(record.id)
    dispatch({
      type: callMethod.delete,
      payload: record.id,
    })
  }

  const openChildItem = () => {
    if (open) {
      sessionStorage.setItem(`${entity.type}Id`, getChildKey)
      dispatch({
        type: callMethod.get,
      })
      return true
    }
    return false
  }

  const cancel = () => {
    setEditingKey('')
  }

  const save = async id => {
    try {
      const row = await form.validateFields()
      const newData = [...data]
      const index = newData.findIndex(item => id === item.id)
      console.log(index)

      if (index > -1) {
        console.log(1)
        const item = newData[index]
        newData.splice(index, 1, { ...item, ...row })
        setData(newData)
        setEditingKey('')
        dispatch({
          type: callMethod.post,
          payload: newData,
        })
      } else {
        if (row != null) {
          newData.push(newData[newData.length - 1])
        } else {
          newData.push(JSON.stringify(row))
        }
        setData(newData)
        setEditingKey('')
      }
      // onFinish()
    } catch (errInfo) {
      console.log(errInfo)
    }
  }

  const columnActions = [
    {
      title: '',
      width: '15%',
      dataIndex: 'operation',
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <span>
            <a
              id={`Save_${record.id}`}
              href="javascript:void(0);"
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              <SaveOutlined />
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <UndoOutlined />
            </Popconfirm>
          </span>
        ) : (
          <div>
            <span>
              <a
                type="dashed"
                href="javascript:void(0);"
                id={`Edit_${record.id}`}
                onClick={() => edit(record)}
              >
                <EditOutlined />
              </a>
            </span>
            &nbsp;
            <span>
              <a
                href="javascript:void(0);"
                onClick={() => {
                  setOpen(true)
                  setChildKey(record.id)
                }}
              >
                <FolderOpenOutlined />
              </a>
            </span>
            &nbsp;
            <span>
              <a
                type="dashed"
                href="javascript:void(0);"
                id={`Edit_${record.id}`}
                onClick={() => deleteRow(record)}
              >
                <DeleteOutlined />
              </a>
            </span>
          </div>
        )
      },
    },
  ]

  const columns = columnDefinitions.concat(columnActions)

  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })

  const handleAdd = () => {
    const postData = [...data]

    const ids = postData.map(dt => dt.id)
    const sorted = ids.sort((a, b) => a - b)

    dataObject.id = sorted[sorted.length - 1] + 1
    postData.push(dataObject)
    dispatch({
      type: callMethod.post,
      payload: postData,
    })
    setData(postData)
  }

  return (
    <div>
      <div className="mb-1">
        <Form layout="horizontal" hideRequiredMark className="mb-1 form-inline">
          <div className="site-button-ghost-wrapper">
            <Space>
              <Tooltip title="add row">
                <Button
                  type="dashed"
                  shape="block"
                  onClick={handleAdd}
                  loading={user.loading}
                  icon={<PlusOutlined />}
                />
              </Tooltip>
            </Space>
            <br />
            <br />
          </div>
        </Form>
      </div>
      {openChildItem()}
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowKey="id"
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  )
}
export default TableWide

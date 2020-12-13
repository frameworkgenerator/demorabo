import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import 'antd/dist/antd.css'
import TableWide from '../../TableFields'
import columnDefinitions from './columns.json'
import dataObject from './dataObject.json'
import callMethod from './call.json'
import entity from './entity.json'

const mapStateToProps = ({ service, user, dispatch }) => ({
  dataSource: service.fields,
  dispatch,
  user,
})

const FieldsTable = ({ dataSource, user, dispatch }) => {
  return (
    <div>
      <TableWide
        columnDefinitions={columnDefinitions}
        dataObject={dataObject}
        callMethod={callMethod}
        entity={entity}
        dataSource={dataSource}
        dispatch={dispatch}
        user={user}
      />
    </div>
  )
}
export default withRouter(connect(mapStateToProps)(FieldsTable))

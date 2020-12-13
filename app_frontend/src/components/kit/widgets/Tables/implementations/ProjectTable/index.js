import React, {useEffect, useState} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import 'antd/dist/antd.css'
import DefaultTable from '../../DefaultWide'
import columnDefinitions from './columns.json'
import dataObject from './dataObject.json'
import callMethod from './call.json'
import entity from './entity.json'

const mapStateToProps = ({ service, user, dispatch }) => ({
  dataSource: service.projects,
  dispatch,
  user,
})

const Projects = ({ dataSource, user, dispatch }) => {
  const [,setData] = useState(dataSource)

  useEffect(() => {
    setData(dataSource)
  }, [dataSource])
  return (
    <div>
      <DefaultTable
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
export default withRouter(connect(mapStateToProps)(Projects))

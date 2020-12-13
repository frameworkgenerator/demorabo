import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CreateModal from '../../../../../../pages/ui-kits/antd/implementations/modalTestSets'

const mapStateToProps = ({ service }) => ({
  testSets: service.testSets,
})

const List11 = props => {
  const { testSets = [] } = props
  const [data] = useState(testSets)

  const agileItems = {
    name: 'Button',
    description: 'To trigger an operation.',
    link: 'https://ant.design/components/button/',
    component: <CreateModal datasetId={1} />,
  }

  const [availableTestSets] = useState(
    data.map(item => {
      return (
        <tr>
          <td>{item.testsetname}</td>
          <td className="text-right">
            <div>{agileItems.component}</div>
          </td>
        </tr>
      )
    }),
  )

  return (
    <div>
      <div className="mb-3">
        <div className="table-responsive">
          <table className="table table-borderless text-gray-6 mb-0">
            <tbody>{availableTestSets}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(List11))

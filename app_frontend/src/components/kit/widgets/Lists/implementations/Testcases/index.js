import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CreateModal from '../../../../../../pages/ui-kits/antd/implementations/modalTestCases'

const mapStateToProps = ({ service }) => ({
  testCases: service.testCases,
})

const List11 = props => {
  const { testCases = [] } = props
  const [data] = useState(testCases)

  const agileItems = {
    name: 'Button',
    description: 'To trigger an operation.',
    link: 'https://ant.design/components/button/',
    component: <CreateModal datasetId={1} />,
  }

  const [availableTestCases] = useState(
    data.map(item => {
      return (
        <tr>
          <td>{item.testcasename}</td>
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
            <tbody>{availableTestCases}</tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default withRouter(connect(mapStateToProps)(List11))

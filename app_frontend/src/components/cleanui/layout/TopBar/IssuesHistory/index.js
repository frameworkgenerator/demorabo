import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { FormattedMessage } from 'react-intl'
import { Menu, Dropdown } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import styles from './style.module.scss'

const mapStateToProps = ({ service }) => ({
  testCases: service.testCases,
})

const IssuesHistory = props => {
  const { testCases = [] } = props
  const [data, setData] = useState(testCases)

  useEffect(() => {
    setData(testCases)
  }, [testCases])

  const [testCaseItems] = useState(
    data.map(item => {
      if (item)
        return (
          <Menu.Item key={item.id}>
            <Link to="/apps/testCase-management">
              <i className="fe fe-check-circle mr-2" /> {item.testcasename}
            </Link>
          </Menu.Item>
        )
      return <div>empty</div>
    }),
  )

  const menu = (
    <Menu selectable={false}>
      <Menu.Item>
        <Link to="/">My recently added testcases</Link>
      </Menu.Item>
      <Menu.ItemGroup title="Opened">{testCaseItems}</Menu.ItemGroup>
    </Menu>
  )
  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomLeft">
      <div className={styles.dropdown}>
        <i className={`${styles.icon} fe fe-folder`} />
        <span className="d-none d-xl-inline">
          <FormattedMessage id="topBar.issuesHistory" />
        </span>
      </div>
    </Dropdown>
  )
}
export default withRouter(connect(mapStateToProps)(IssuesHistory))

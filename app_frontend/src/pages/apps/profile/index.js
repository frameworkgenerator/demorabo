import React from 'react'
import { Helmet } from 'react-helmet'
import General10v1 from 'components/kit/widgets/General/10v1'
import { connect } from 'react-redux'
import Sidebar from '../../../components/cleanui/layout/Sidebar'

const mapStateToProps = ({ user }) => ({
  user,
})

const AppsProfile = ({ user }) => {
  return (
    <div>
      <Sidebar />
      <Helmet title="Profile" />
      <div className="row">
        <div className="col-xl-4 col-lg-12">
          <div className="card">
            <div className="card-body">
              <General10v1
                displayName={user.displayName}
                photoURL={user.avatar}
                token={user.token}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default connect(mapStateToProps)(AppsProfile)

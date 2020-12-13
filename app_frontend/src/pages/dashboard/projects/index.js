import React from 'react'
import { Helmet } from 'react-helmet'
import ProjectTableWide from '../../../components/kit/widgets/Tables/implementations/ProjectTable'

const DashboardAlpha = () => {
  return (
    <div>
      <Helmet title="Projects" />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <div className="cui__utils__heading mb-0">
                <strong>Projects</strong>
              </div>
              <div className="text-muted">Overview datasets</div>
            </div>
            <div className="card-body">
              <div className="kit__utils__table">
                <ProjectTableWide />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAlpha

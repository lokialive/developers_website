import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { deleteWork } from '../../actions/profileActions'

class Work extends Component {
  onDeleteClick(id) {
    this.props.deleteWork(id)
  }
  render() {
    let works = null
    if (this.props.work.length > 0) {
      works = this.props.work.map((work) => (
        <tr key={work._id}>
          <td>{work.title}</td>

          <td>
            <button
              onClick={this.onDeleteClick.bind(this, work._id)}
              className="btn btn-danger"
              style={{ float: 'right', marginRight: '20px' }}
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    }

    return (
      <div>
        <h4 className="mb-4">Work Positions</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>

              <th />
            </tr>
            {works}
          </thead>
        </table>
      </div>
    )
  }
}

Work.propTypes = {
  deleteWork: PropTypes.func.isRequired,
}

export default connect(null, { deleteWork })(Work)

import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import TextFieldGroup from '../../common/TextFieldGroup'
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup'

import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// import { addEducation } from '../../actions/profileActions'
import { addWork } from '../../actions/profileActions'

class AddWork extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      errors: {},
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      })
    }
  }

  onSubmit(e) {
    e.preventDefault()
    const workData = {
      title: this.state.title,
      description: this.state.description,
      errors: this.state.errors,
    }
    this.props.addWork(workData, this.props.history)
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { errors } = this.state

    return (
      <div className="add-Education">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Return
              </Link>
              <h1 className="display-4 text-center">Add Work Position</h1>

              <small className="d-block pb-3">* Required</small>

              {/* Form */}
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />

                <TextAreaFieldGroup
                  placeholder="Description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Please introduce the job position"
                />
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

AddWork.propTypes = {
  addWork: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
})

export default connect(mapStateToProps, { addWork })(withRouter(AddWork))

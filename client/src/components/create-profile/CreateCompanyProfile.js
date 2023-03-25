import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../../common/TextFieldGroup'
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup'

import { createProfile } from '../../actions/profileActions'
class CreateCompanyProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: 'Employer',
      handle: '',
      companyName: '',
      website: '',
      location: '',
      industry: '',
      introduction: '',
      phone: '',
      errors: {},
      yearFounded: '',
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onSubmit(e) {
    e.preventDefault()

    const profileData = {
      type: 'Employer',
      handle: this.state.handle,
      companyName: this.state.companyName,
      website: this.state.website,
      location: this.state.location,
      industry: this.state.industry,
      bio: this.state.bio,
      phone: this.state.phone,
      yearFounded: this.state.yearFounded,
    }

    // console.log(profileData);

    this.props.createProfile(profileData, this.props.history)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { errors } = this.state

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Company Profile</h1>
              <p className="lead text-center">
                Finish your company profile, let developers know you more!
              </p>
              <small className="d-block pb-3">* required</small>

              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="This should be your account email"
                />

                <TextFieldGroup
                  placeholder="Company Name"
                  name="companyName"
                  value={this.state.companyName}
                  onChange={this.onChange}
                  error={errors.companyName}
                  info="Your company name"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Company webiste"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Company's current location (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Industry"
                  name="industry"
                  value={this.state.industry}
                  onChange={this.onChange}
                  error={errors.industry}
                  info="Please enter your company's main industry"
                />

                <TextAreaFieldGroup
                  placeholder="Introduction"
                  name="Introduction"
                  value={this.state.introduction}
                  onChange={this.onChange}
                  error={errors.introduction}
                  info="Please briefly introduce your company."
                />

                <TextAreaFieldGroup
                  placeholder="Phone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.onChange}
                  error={errors.phone}
                  info="Please briefly introduce your company."
                />

                <TextAreaFieldGroup
                  placeholder="Year of founded"
                  name="yearFounded"
                  value={this.state.yearFounded}
                  onChange={this.onChange}
                  error={errors.yearFounded}
                  info="When did your company founded."
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

CreateCompanyProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
})

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateCompanyProfile),
)

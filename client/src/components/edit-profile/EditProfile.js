import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../../common/TextFieldGroup'
import TextAreaFieldGroup from '../../common/TextAreaFieldGroup'
import SelectListGroup from '../../common/SelectListGroup'
import InputGroup from '../../common/InputGroup'
import { createProfile, getCurrentProfile } from '../../actions/profileActions'
import isEmpty from '../../validation/is-empty'
class CreateProfile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      type: 'Employee',
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      wechat: '',
      QQ: '',
      tengxunkt: '',
      wangyikt: '',
      errors: {},
      followed: [],
    }

    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getCurrentProfile()
  }

  onSubmit(e) {
    e.preventDefault()

    const profileData = {
      type: 'Employee',
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      wechat: this.state.wechat,
      QQ: this.state.QQ,
      tengxunkt: this.state.tengxunkt,
      wangyikt: this.state.wangyikt,
      followed: this.state.followed,
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

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile

      profile.company = !isEmpty(profile.company) ? profile.company : ''
      profile.website = !isEmpty(profile.website) ? profile.website : ''
      profile.location = !isEmpty(profile.location) ? profile.location : ''
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : ''
      profile.bio = !isEmpty(profile.bio) ? profile.bio : ''

      profile.social = !isEmpty(profile.social) ? profile.social : {}
      profile.wechat = !isEmpty(profile.social.wechat)
        ? profile.social.wechat
        : ''
      profile.QQ = !isEmpty(profile.social.QQ) ? profile.social.QQ : ''
      profile.tengxunkt = !isEmpty(profile.social.tengxunkt)
        ? profile.social.tengxunkt
        : ''
      profile.wangyikt = !isEmpty(profile.social.wangyikt)
        ? profile.social.wangyikt
        : ''

      const skillsCSV = profile.skills.join(',')

      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        wechat: profile.wechat,
        QQ: profile.QQ,
        tengxunkt: profile.tengxunkt,
        wangyikt: profile.wangyikt,
      })
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    const { errors, displaySocialInputs } = this.state

    let socialInputs

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Wechat"
            name="wechat"
            icon="fab fa-weixin"
            value={this.state.wechat}
            onChange={this.onChange}
            error={errors.wechat}
          />

          <InputGroup
            placeholder="QQ"
            name="QQ"
            icon="fab fa-qq"
            value={this.state.QQ}
            onChange={this.onChange}
            error={errors.QQ}
          />

          <InputGroup
            placeholder="Tencent"
            name="tengxunkt"
            icon="fab fa-wechat"
            value={this.state.tengxunkt}
            onChange={this.onChange}
            error={errors.tengxunkt}
          />

          <InputGroup
            placeholder="Cloud"
            name="wangyikt"
            icon="fab fa-wechat"
            value={this.state.wangyikt}
            onChange={this.onChange}
            error={errors.wangyikt}
          />
        </div>
      )
    }

    const options = [
      {
        label: '* Please select your job title',
        value: '* Please select your job title',
      },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'HighDeveloper', value: 'HighDeveloper' },
      { label: 'Manager', value: 'Manager' },
      { label: 'backend Developer', value: 'backend Developer' },
      { label: 'python machine learning', value: 'python machine learning' },
      { label: 'Other', value: 'Other' },
    ]
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Esit personal Profile</h1>

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

                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                  info="Your current company"
                />

                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={this.state.company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Please tell us your current company"
                />
                <TextFieldGroup
                  placeholder="Webiste"
                  name="website"
                  value={this.state.website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Your personal website"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={this.state.location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="You current location (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma(,) to split your skills. (eg: HTML,CSS,JavaScript,PHP)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want to share your project to others, you can share your github username."
                />
                <TextAreaFieldGroup
                  placeholder="Introduction"
                  name="bio"
                  value={this.state.bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Please briefly introduce yourself."
                />

                <div className="mb-3">
                  <button
                    className="btn btn-light"
                    type="button"
                    onClick={() => {
                      this.setState((prevState) => ({
                        displaySocialInputs: !prevState.displaySocialInputs,
                      }))
                    }}
                  >
                    Add Social Account
                  </button>
                  <span className="text-muted">Option</span>
                </div>
                {socialInputs}
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

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(CreateProfile),
)

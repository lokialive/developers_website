import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import PostForm from './PostForm'
import { getPosts } from '../../actions/postActions'
import Spinner from '../../common/Spinner'
import PostFeed from './PostFeed'

class Posts extends Component {
  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const { posts, loading } = this.props.post
    const { user } = this.props.auth

    let postContent

    if (posts === null || loading) {
      postContent = <Spinner />
    } else {
      postContent = <PostFeed posts={posts} />
    }

    let postForm = <PostForm />
    if (user.type === 'Admin') {
      postForm = <div></div>
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {/*Display Post Content */}

              {postForm}
              {/* Display like numbers */}
              {postContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  post: state.post,
  auth: state.auth,
})
export default connect(mapStateToProps, { getPosts })(Posts)

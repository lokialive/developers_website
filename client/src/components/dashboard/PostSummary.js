import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PropTypes } from 'prop-types'
import { getPosts } from '../../actions/postActions'
import { Link } from 'react-router-dom'
import './index.css'

class PostSummary extends Component {
  componentDidMount() {
    this.props.getPosts()
  }

  render() {
    const { posts } = this.props.posts
    const userId = this.props.auth.user.id
    let postItems = posts
      .filter((post) => post.user === userId)
      .map((post, index) => (
        <tr key={index}>
          <td>
            {' '}
            <Link to={`/post/${post._id}`} className="no-deco">
              {index + 1}.
            </Link>
          </td>
          <td>
            <Link to={`/post/${post._id}`} className="no-deco">
              {post.text}
            </Link>
          </td>
          <td>
            <Link to={`/post/${post._id}`} className="no-deco">
              {post.likes.length}
            </Link>
          </td>
          <td>
            <Link to={`/post/${post._id}`} className="no-deco">
              {post.comments.length}
            </Link>
          </td>
        </tr>
      ))

    return (
      <div className="post-list">
        <div className="module">
          <p className="module-title">My Posts</p>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th style={{ color: 'whitesmoke' }}>&nbsp;No.</th>
              <th style={{ color: 'whitesmoke' }}>&nbsp;&nbsp;Content</th>
              <th style={{ color: 'whitesmoke' }}>Liked</th>
              <th style={{ color: 'whitesmoke' }}>Comments</th>
              <th style={{ color: 'whitesmoke' }} />
            </tr>
            {postItems}
          </thead>
        </table>
      </div>
    )
  }
}

PostSummary.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  posts: state.post,
  auth: state.auth,
})
export default connect(mapStateToProps, { getPosts })(PostSummary)

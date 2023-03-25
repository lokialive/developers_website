// rfc: react function component
import React, { Component } from 'react'
import { render } from 'react-dom'

class Loading extends Component {
  render() {
    return (
      <div>
        <img src="../../common/spinner.gif"></img>
      </div>
    )
  }
}

export default Loading

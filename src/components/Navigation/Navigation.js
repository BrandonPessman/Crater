import React from 'react'
import './Navigation.css'
import AceEditor from 'react-ace'

const seeScript = require('seescript')

export default class Viewport extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      dragging: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this)
  }

  handleSubmit() {
    const parent = document.getElementById('canvas')
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild)
    }

    seeScript.runSeeScript(
      document.getElementById('programmingTextarea').childNodes[2].childNodes[0]
        .childNodes[2].innerText
    )
  }

  handleSubmitEdit() {
    var canvas = document.getElementById('canvas')

    for (let i = 0; i < canvas.childNodes.length; i++) {
      let childNode = canvas.childNodes[i]
      childNode.setAttribute('class', 'draggable')

      childNode.onmousedown = e => {
        this.setState({ dragging: true })
      }
      childNode.onmousemove = e => {
        if (this.state.dragging) {
          var CTM = document.getElementById('canvas').getScreenCTM()
          var fixedX = (e.clientX - CTM.e) / CTM.a - 25
          var fixedY = (e.clientY - CTM.f) / CTM.d - 25

          e.target.setAttribute('x', fixedX)
          e.target.setAttribute('y', fixedY)
        }
      }
      childNode.onmouseup = e => {
        this.setState({ dragging: false })
      }
    }

    console.log(canvas.childNodes)
  }

  render() {
    return (
      <div className="navigation">
        <button onClick={this.handleSubmit}>Play</button>
        <button onClick={this.handleSubmitEdit}>Edit</button>
        <button>Download</button>
      </div>
    )
  }
}

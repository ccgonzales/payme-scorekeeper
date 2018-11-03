import React, { Component } from "react"
import ReactDOM from "react-dom"
import './player.css'

class AddPlayer extends Component {
  constructor(props) {
    super(props)

    this.handleUpdateInput = this.handleUpdateInput.bind(this)
    this.handleAddNewPlayer = this.handleAddNewPlayer.bind(this)
  }

  handleUpdateInput(e){
    this.props.onUpdateInput(e.target.value)
  }

  handleAddNewPlayer(){
    this.props.onAddNewPlayer()
  }

render() {
  return (
      <div className="addPlayer">
      <p className="addPlayer__instruct">add two or more players to start game</p>
      <div>
        <input className="addPlayer__input" type="text" value={this.props.nameInput} onChange={this.handleUpdateInput} />
        <button className="addPlayer__btn" onClick={this.handleAddNewPlayer}>add</button>
      </div>
      </div>
    )
  }
}

export default AddPlayer

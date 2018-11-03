import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class PlayerList extends Component {
  constructor(props) {
    super(props)
    this.handleOnStartGame = this.handleOnStartGame.bind(this)
  }
  handleOnStartGame() {
    this.props.onStartGame()
  }
  render() {
    return (
    this.props.list.length > 0 &&
      <section className="playerList" >

        <h3 className="playerList__title">Player List</h3>
        <ol className="playerList__list">
        {
          this.props.list.map((player) =>
            <li className="playerList__item" key={player.name}>{player.name}</li> )
        }
        </ol>
      </section>
    )
  }
}

export default PlayerList

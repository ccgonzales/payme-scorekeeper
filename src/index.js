import React, { Component } from "react";
import ReactDOM from "react-dom";
import Intro from "./intro.js"
import Header from "./components/Display/Header"
import AddPlayer from './components/Player/AddPlayer'
import PlayerList from './components/Player/Players'
import StartGame from './components/Controls/StartGame'
import NextRound from './components/Controls/NextRound'

import './Game.css'

const Summary = (props) => {
  return (
    <div>
    {
      props.players.map((player) => (
        [<label key={player.name}>{player.name}: </label>,
        <span>{player.roundScore.reduce((sum, current) => sum + current)}</span>
      ]
      ))
    }
    </div>
  )
}

const RoundDisplay = (props) => {
  return (
    <h2>Round {props.currentRound} </h2>
  )
}

const WildDisplay = (props) => {
  return (
    <h2>Wild {props.wild} </h2>
  )
}

class ScoreDisplay extends Component {
  constructor(props) {
    super(props)
    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(e){
    const target = e.target
    const player = target.id
    const score = target.value === "" ? 0 : target.value
    this.props.onUpdateScore(player, parseInt(score))

// TODO: process winners through target.name conditional
    // if (target.name = 'score') {
    //   //do score
    // }
    // if (target.name = 'isWinner') {
    //   //do winner
    // }
}

  render() {
    const layout = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gridGap: '1fr'
    }

    const playersSorted = this.props.players.slice(0).sort((a,b) => {
      return a.order - b.order
    })

    return (
      <section>
        {
          playersSorted.map((player) => (
        <div key={player.name}  style={layout}>
          <div>{player.name}</div>
          <div>
            <input type="number"
              name="score" size="3" id={player.name}
              onChange={this.handleOnChange}
              />
          </div>
          <div><input type="radio" name="winner"/> Winner?</div>
          <div>{player.roundScore.length > 0 ? player.roundScore.reduce((sum, current) => sum + current) : 0 }</div>
        </div>
        ))
      }
      </section>
    )
  }
}

class Game extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentRound: 1,
      hasGameStarted: false, // TODO: change back to false for deployment
      players: [ // TODO: remove seed data for deployment
        //  {name: 'floo', order: 0, roundScore: [1, 1], score: 2, wins: 0},
        //  {name: 'flum', order: 1, roundScore: [2, 2], score: 4, wins: 0},
          // {name: 'flam', order: 2, roundScore: [3, 3], score: 6, wins: 0},
      ],
      nameInput: ''
    }
    this.handleAddNewPlayer = this.handleAddNewPlayer.bind(this)
    this.updateInput = this.updateInput.bind(this)
    this.onStartGame = this.onStartGame.bind(this)
    this.onUpdateScore = this.onUpdateScore.bind(this)
    this.onNextRound = this.onNextRound.bind(this)
  }

  handleAddNewPlayer() {
    if (this.state.nameInput.trim() !== '') {
    this.setState((currentState) => {
      return {
        players: currentState.players.concat([{
          name: this.state.nameInput.trim(),
          order: currentState.players.length,
          roundScore: [],
          score: 0,
          wins: 0,
        }]),
        nameInput: ''
      }
    })
    }
  }

  onNextRound() {
    this.setState((prevState) => {
      return {currentRound: prevState.currentRound + 1}
    })
  }

  onUpdateScore(playerName, score) {
    this.setState((currentState) => {
      const player = currentState.players.find((player) => player.name === playerName)
      return {
        players: currentState.players.filter((player) => player.name !== playerName)
          .concat([{
            name: playerName,
            order: player.order,
            roundScore: player.roundScore.slice(0, currentState.currentRound-1).concat([score]),
            wins: player.wins,
          }])
      }
  })
}

  onStartGame() {
    this.setState({hasGameStarted: true})
  }

  updateInput(e) {
    this.setState({
      nameInput: e,
    })
  }

  render() {
    const hasGameStarted = this.state.hasGameStarted
    const wildCards = ["3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]

    return (
      <section>
        { hasGameStarted === true && this.state.currentRound < 12 &&
          <div>
            <Header />
            <RoundDisplay currentRound={this.state.currentRound} />
            <WildDisplay wild={wildCards[this.state.currentRound -1]} />
            <ScoreDisplay
              players={this.state.players}
              onUpdateScore={this.onUpdateScore}
              currentRound={this.currentRound}
              />
              <NextRound onNextRound={this.onNextRound} />
          </div>
        }
        { hasGameStarted === false &&
          <div>
          <Intro />
          <AddPlayer
            nameInput={this.state.nameInput}
            onUpdateInput={this.updateInput}
            onAddNewPlayer={this.handleAddNewPlayer}
            />
          <PlayerList
            list={this.state.players}
            />
          {this.state.players.length > 1 &&
            <StartGame onStartGame={this.onStartGame}/>
          }
          </div>
        }
        { this.state.currentRound > 11 &&
          <div>
          <h3>Game Over!</h3>
          <Summary players={this.state.players} />
          </div>
        }
        </section>
    )
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

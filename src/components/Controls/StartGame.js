import React from "react"
import ReactDOM from "react-dom"
import './controls.css'


const StartGame = (props) => {
  return (
  //  { props.list.length > 1 &&
    <div className="controlContainer">
        <button className="startGame__btn" onClick={props.onStartGame}>start game</button>
    </div>
    //      }
  )
}

export default StartGame

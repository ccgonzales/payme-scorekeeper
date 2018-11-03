import React from "react"
import ReactDOM from "react-dom"
import './controls.css'


const NextRound = (props) => {
  return (
    <div className="controlContainer">
    <button className="nextRound__btn" onClick={props.onNextRound}>next round</button>
    </div>
  )
}

export default NextRound

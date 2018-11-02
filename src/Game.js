import React, { Component } from 'react';
import times from 'lodash/times'
import './App.css'
import Mario from './presentational_components/Mario'
import MushRoom from './presentational_components/MushRoom'

class Game extends Component {

  constructor (props) {
    super(props)
    this.state = { mushroomPositions: {}, marioPosition: {row: 0, column: 0}, totalSteps: 0, currentMushRoomCount : 0 }
  }

  getProps () {
    const {rowCount = 10, columnCount = 10} = this.props
    return {rowCount, columnCount}
  }

  componentDidMount () {
    this.generateMushroomPositions()
    this.addUserInteraction()
  }

  addUserInteraction () {
    document.addEventListener('keydown', this.handleKeyPress.bind(this) , false);
  }

  handleKeyPress (event) {
    if (this.state.currentMushRoomCount === 0) {
      return
    }

    let newPos = {}
    switch(event.which) {
      case 38:
        newPos = this.handleUpKey()
        break
      case 40:
        newPos = this.handleDownKey()
        break
      case 37:
        newPos = this.handleLeftKey()
        break
      case 39:
        newPos = this.handleRightKey()
        break
      default:
        return
    }
    this.handleStateAfterKeyPress(newPos)
    setTimeout(this.checkGameProgress.bind(this), 0)
  }

  handleStateAfterKeyPress (newPos) {
    const {columnCount} = this.getProps()
    const newMarioPosition = Object.assign({}, this.state.marioPosition, newPos)
    let mushroomPositions = Object.assign({}, this.state.mushroomPositions)
    const newMarioPositionIndex = newMarioPosition.row * columnCount + newMarioPosition.column
    let {currentMushRoomCount} = this.state

    if (mushroomPositions[newMarioPositionIndex]) {
      mushroomPositions[newMarioPositionIndex] = false
      currentMushRoomCount -= 1
    }

    this.setState({
      marioPosition: newMarioPosition,
      totalSteps: this.state.totalSteps + 1,
      mushroomPositions,
      currentMushRoomCount
    })
  }

  checkGameProgress () {
    let {currentMushRoomCount} = this.state
    if (currentMushRoomCount === 0) {
      alert(`Game Over: Total moves to save the princess ${this.state.totalSteps}`)
    }
  }

  handleUpKey () {
    const {row} = this.state.marioPosition
    return {row: row === 0 ? 1 : row - 1}
  }

  handleDownKey () {
    const {row} = this.state.marioPosition
    return {row: row === this.props.rowCount - 1 ?  this.props.rowCount - 2 : row + 1}
  }

  handleLeftKey () {
    const {column} = this.state.marioPosition
    return {column: column === 0 ? 1 : column - 1}
  }

  handleRightKey () {
    const {column} = this.state.marioPosition
    return {column: column === this.props.columnCount - 1 ? this.props.columnCount - 2 : column + 1}
  }

  generateMushroomPositions () {
    let no = 0,  mushroomPositions = {}, allGenerated = false
    const {rowCount, columnCount} = this.getProps()
    while(!allGenerated) {
      no = Math.floor(Math.random() * (rowCount * columnCount - 1))
      if (no !== 0 ) {
        mushroomPositions = {...mushroomPositions,  [no]: true}
      }
      allGenerated = Object.keys(mushroomPositions).length === rowCount
    }
    this.setState({ mushroomPositions, currentMushRoomCount: rowCount})
  }

  renderGrid () {
    const {rowCount} = this.getProps()
    return times(rowCount, (rowIndex) => this.renderRow(rowIndex))
  }

  renderRow (rowIndex) {
    const {columnCount} = this.getProps()
    return <div key={rowIndex} className='row'>
      {
        times(
          columnCount,
          (columnIndex) => this.renderCell(rowIndex, columnIndex)
        )
      }
    </div>
  }

  renderCell (rowIndex, columnIndex) {
    return  <div className='cell' key={columnIndex}>
              {
                this.renderCellComponent(rowIndex, columnIndex)
              }
            </div>
  }

  renderCellComponent (rowIndex, columnIndex) {
    const {columnCount} = this.getProps()
    if (this.state.mushroomPositions[rowIndex * columnCount + columnIndex]) {
      return <MushRoom />
    } else if (rowIndex === this.state.marioPosition.row && columnIndex === this.state.marioPosition.column) {
      return <Mario />
    } else {
      return null
    }
  }

  render() {
    return (
      <div id='game_container'>
        {
          this.renderGrid()
        }
      </div>
    );
  }
}

export default Game;

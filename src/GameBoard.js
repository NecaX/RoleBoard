import React from 'react';
import './GameBoard.css';
import GameSquare from './GameSquare';


class GameBoard extends React.Component {

  create2DArray(numRows, numColumns) {
    let array = new Array(numRows); 
  
    for(let i = 0; i < numColumns; i++) {
      array[i] = new Array(numColumns); 
    }
  
    return array; 
  }

  /**
   * Method that updates the table with the different elements of the Board
   * Can be expandable by making different forEach with each structure of elements that will exist (enemies, obstacles, etc)
   */
  updateTable(){
    var myTable = this.create2DArray(this.props.rows, this.props.columns);
    this.props.players.forEach((elem) => {
      var {id, x, y} = elem
      myTable[x][y] = id;
    })
    return myTable;
  }



  renderRows(){
    var items = []
    var myTable = this.updateTable();

    for (var i = 0; i < this.props.rows; i++){
      items.push(<tr style={{borderWidth: '1px', borderStyle: 'solid'}}> {this.renderColumns(i, myTable)} </tr>)
    }

    return (
      <tbody style={{borderWidth: '1px', borderStyle: 'solid'}}>
        {items}
      </tbody>
    )
  }

  renderColumns(row, myTable){

    return [...Array(this.props.columns)].map((x, i) =>{
      return(
        <GameSquare x={i} y={row} content={myTable[i][row]} handleClick={(x,y) => this.props.handleClick(x,y)}/>
      )
    })
  }


  render(){
    return (
      <div className="GameBoard">
        <table style={{borderWidth: '1px', borderStyle: 'solid'}}>
            {this.renderRows()}
        </table>
      </div>
    )
  }
}

export default GameBoard;

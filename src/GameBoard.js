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
        <GameSquare x={i} y={row} content={myTable[i][row]} myself={this.props.playerId === myTable[i][row]} myTurn={this.props.myTurn} handleClick={(x,y) => this.props.handleClick(x,y)}/>
      )
    })
  }

  /**
   * Funcion que controla la creacion de filas de la tabla de manera dinamica
   * con la lista de jugadores activos. 
   * (Actualmente en uso)
   */
  renderPlayersData(){
    return this.props.players.map((player, index) => {
      return(
        <tr>
          <td >Player {player['id']}</td>
          <td>X: {player['x']}</td>
          <td>Y: {player['y']}</td>
          <td>Turn: {player['turn']}</td>
        </tr>
      )
    })
  }


  render(){
    return (
      <div className="GameBoard">
        <table style={{borderWidth: '1px', borderStyle: 'solid'}}>
            {this.renderRows()}
        </table>
        <table style={{margin: '40px'}}>
          <tbody>
            {this.renderPlayersData()}
          </tbody>
        </table>
        <div style={{margin: '20px'}}>
          Cycle: {this.props.cycle}
        </div>
      </div>
    )
  }
}

export default GameBoard;

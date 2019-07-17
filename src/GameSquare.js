import React from 'react';
import './GameSquare.css';


class GameSquare extends React.Component {

  render(){
    return (
      <td className="GameSquare" onClick={() => this.props.handleClick(this.props.x, this.props.y)}>
        {/* Content of each square. Can (will) be expanded with images, backgrounds and different elements */}
          {this.props.content === undefined ? '-' : `Player ${this.props.content}`}
      </td>
    )
  }
}

export default GameSquare;

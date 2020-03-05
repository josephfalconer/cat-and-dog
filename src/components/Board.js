import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateSimpleState } from '../actions/';
import {
  GAME_STYLE_DEFAULT,
  ROBOTS_BY_GAME_STYLE
} from '../constants';
import { obstructionsSet } from '../scenarios/';
import FoodLayer from './FoodLayer';
import Human from './Human';
import Robot from './Robot';
import Space from './Space';

const OBSTRUCTIONS_BY_GAME_STYLE = {
  PURSUIT_STYLE: spaces => {
    const noOfObstructions = 10;
    for (let i = 0; i < noOfObstructions; i++) {
      let ranX = Math.floor(Math.random() * spaces.length);
      let ranY = Math.floor(Math.random() * spaces[0].length);
      if (!spaces[ranX][ranY].isEdge) {
        spaces[ranX][ranY].occupant = 'OBSTRUCTION';
      }
    }
    return spaces;
  },
  PACMAN_STYLE: spaces => {
    obstructionsSet.forEach((obstruction, index) => {
      spaces[obstruction[0]][obstruction[1]].occupant = 'OBSTRUCTION';
    });
    return spaces;
  }
}

class Board extends PureComponent {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    boardSpaces: PropTypes.array.isRequired,
    gameStyle: PropTypes.string.isRequired,
    robots: PropTypes.array.isRequired
  }

  componentDidMount() {
    const { gameStyle } = this.props;
    const boardSpaces = this.getSpaces(gameStyle === GAME_STYLE_DEFAULT);
    this.isInGame = true;
    this.props.updateSimpleState({
      boardSpaces,
      freeBoardSpaces: this.getFreeSpaces(boardSpaces),
      robots: ROBOTS_BY_GAME_STYLE[gameStyle]()
    });
  }

  componentWillUnmount() {
    this.isInGame = false;
  }

  getSpaces = isStyledEdges => {
    const { gameStyle, width, height } = this.props;
    let spaces = [];
    let isEdge = false;
    // create 2d array of x/y spaces
    for (let x = 0; x < width; x++) {
      spaces[x] = [];
      for (let y = 0; y < height; y++) {
        isEdge = x === 0 || y === 0 || x === (width - 1) || y === (height - 1);
        spaces[x][y] = {
          x: x,
          y: y,
          occupant: null,
          isEdge: isStyledEdges && isEdge,
        };
      }
    }
    spaces = OBSTRUCTIONS_BY_GAME_STYLE[gameStyle](spaces);
    return spaces;
  }

  getFreeSpaces = spaces => {
    return spaces.reduce((a, b) => a.concat(b))
      .filter(space => !space.occupant);
  }

  render() {
    const { boardSpaces, robots } = this.props;
    return (
      <div className="board">
        {boardSpaces.length && boardSpaces.map((column, index) => {
          return (
            <div className="board__column" key={index}>
              {column.map((space, index) => {
                return (
                  <Space
                    key={index}
                    data={space}
                  />
                )
              })}
            </div>
          );
        })}
        <Human />
        {robots.length ? robots.map((robot, index) =>
          <Robot
            key={`robot-${index}`}
            index={index}
            data={robot}
          />
        ) : null}
        <FoodLayer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    boardSpaces: state.boardSpaces,
    gameStyle: state.gameStyle || GAME_STYLE_DEFAULT,
    robots: state.robots || []
  }
};

export default connect(mapStateToProps, {
  updateSimpleState
})(Board);

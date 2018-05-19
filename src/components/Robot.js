import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/';
import { GAME_STYLE_DEFAULT, LEFTS, RIGHTS } from '../constants';
import * as helpers from '../helpers';
import Player from './Player';

class Robot extends Player {
  constructor(props) {
    super(props);
    this.isBlocked = false;
    this.name = 'ROBOT';
    this.isDoneTwoBlockedMoves = false;
    this.index = props.index;
    this.followPathMethods = {
      PURSUIT_STYLE: this.followPursuitPath,
      PACMAN_STYLE: this.followPatrolPath
    }
  }

  static propTypes = {
    currentFoods: PropTypes.array.isRequired,
    index: PropTypes.number.isRequired,
    gameSwitches: PropTypes.object.isRequired,
    delay: PropTypes.number.isRequired,
    human: PropTypes.object.isRequired,
    boardSpaces: PropTypes.array.isRequired,
    start: PropTypes.array.isRequired,
    gameStyle: PropTypes.string.isRequired
  }

  state = {
    style: helpers.writeTransform(9, 7),
    currentFace: 'RIGHT',
    currentVisualFace: 'RIGHT'
  }

  componentDidMount() {
    const { gameStyle, start, delay } = this.props;
    this.moveForward(start.x, start.y, 'RIGHT');
    this.isInGame = true;
    // set movement interval
    this.intervalID = setInterval(this.followPathMethods[gameStyle], delay);
  }

  componentWillUnmount() {
    // clear movement interval
    this.isInGame = false;
    clearInterval(this.intervalID);
  }

  followPatrolPath = () => {
    if (this.isInGame && !this.props.gameSwitches.isGameOver) {
      const { x, y, currentFace } = this.state;
      const validXY = this.checkMove(x, y, currentFace);
      if (validXY) {
        this.setState({...this.state, currentVisualFace: currentFace});
        this.moveRobotForward(validXY, currentFace); 
        this.turn(this.getRight(currentFace), false);
      } else {
        this.turn(this.getLeft(currentFace));
      }        
    }
  }

  followPursuitPath = () => {
    if (this.isInGame && !this.props.gameSwitches.isGameOver) {
      if (this.isBlocked) {
        this.isDoneTwoBlockedMoves = false;
        this.doBlockedPursuitStep('LEFT');
      } else {
        this.doNormalPursuitStep();
      }
    }
  }

  doBlockedPursuitStep = direction => {
    const { x, y, currentFace } = this.state;
    const newFace = direction === 'LEFT' ? this.getLeft(currentFace) : this.getRight(currentFace);
    const validXY = this.checkMove(x, y, newFace);
    this.turn(newFace);
    if (validXY) {
      this.isBlocked = false;
      this.moveRobotForward(validXY, newFace);
      // prevent infinite setTimeout
      if (!this.isDoneTwoBlockedMoves) {
        setTimeout(() => {
          this.isDoneTwoBlockedMoves = true;
          this.doBlockedPursuitStep('RIGHT');
        }, this.props.delay / 2);
      }
    } else {
      this.isBlocked = true;
    }
  }

  doNormalPursuitStep = () => {
    // if human's x position is different to robot's x position
    if (this.props.human.x !== this.state.x) {
      // pursue on x axis
      this.isBlocked = this.pursueHuman('x');
    }
    setTimeout(() => {
      if (this.isInGame) {
        // if human's y position is different to robot's y position
        if (this.props.human.y !== this.state.y) {
          // pursue on y axis
          this.isBlocked = this.pursueHuman('y');
        }
      }
    }, this.props.delay / 2);
  }

  pursueHuman = axis => {
    const { x, y } = this.state;
    const newDirection = axis === 'x' ? this.checkHumanPositionX(x) : this.checkHumanPositionY(y);
    const validXY = this.checkMove(x, y, newDirection);
    // turn robot whether can move or not
    if (this.isInGame) {
      this.turn(newDirection);
    }
    if (validXY) {
      this.moveRobotForward(validXY, newDirection);
      return false;
    }
    return true;
  }

  checkHumanPositionX = x => {
    return this.props.human.x > x ? 'RIGHT' : 'LEFT';
  }

  checkHumanPositionY = y => {
    return this.props.human.y > y ? 'DOWN' : 'UP';
  }

  turn = (newFace, isVisualTurn=true) => {
    if (this.isInGame) {
      this.setState({ 
        ...this.state, 
        currentFace: newFace,
        currentVisualFace: isVisualTurn ? newFace : this.state.currentVisualFace
      });
    }
  }

  moveRobotForward = (nextSpace, newFace) => {
    const { x, y } = nextSpace;
    const { human, updateRobotPosition } = this.props;
    if (x === human.x && y === human.y) {
      actions.endTheGame('A dog caught you!');
    } else {
      updateRobotPosition(this.index, x, y);
      this.moveForward(x, y, newFace);
    }
  }

  getLeft = currentFace => {
    return LEFTS[currentFace];
  }

  getRight = currentFace => {
    return RIGHTS[currentFace];
  }

  render() {
    const { style, currentVisualFace } = this.state;
    const className = `dog dog-${currentVisualFace.toLowerCase()}`;
    style.backgroundSize = '95%';
    return (
      <span className={className} style={style}></span>
    )
  }
}

const mapStateToProps = state => (
  {
    currentFoods: state.currentFoods,
    boardSpaces: state.boardSpaces,
    gameSwitches: state.gameSwitches,
    delay: state.difficulty,
    human: state.human,
    sampleSpaceWidth: state.sampleSpaceWidth,
    gameStyle: state.gameStyle || GAME_STYLE_DEFAULT
  }
);

export default connect(mapStateToProps, {
  updateRobotPosition: actions.updateRobotPosition,
  updateSimpleState: actions.updateSimpleState
})(Robot);

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/';
import { 
  GAME_STYLE_DEFAULT, 
  LEFTS, 
  RIGHTS
} from '../constants';
import * as helpers from '../helpers';
import Player from './Player';

class Robot extends Player {
  constructor(props) {
    super(props);
    this.isBlocked = false;
    this.name = 'ROBOT';
    this.isDoneTwoBlockedMoves = false;
    this.followPathMethods = {
      PURSUIT_STYLE: this.followPursuitPath,
      PACMAN_STYLE: this.followPatrolPath
    };
    this.isReadyToRender = false;
  }

  static propTypes = {
    index: PropTypes.number.isRequired,
    data: PropTypes.object.isRequired,
    currentFoods: PropTypes.array.isRequired,
    gameSwitches: PropTypes.object.isRequired,
    delay: PropTypes.number.isRequired,
    human: PropTypes.object.isRequired,
    boardSpaces: PropTypes.array.isRequired,
    gameStyle: PropTypes.string.isRequired,
  }

  componentDidMount() {
    const { gameStyle, delay } = this.props;
    this.isInGame = true;
    this.intervalID = setInterval(this.followPathMethods[gameStyle], delay);
  }

  componentWillUnmount() {
    this.isInGame = false;
    clearInterval(this.intervalID);
  }

  followPatrolPath = () => {
    const { data, gameSwitches, index, updateRobot } = this.props;
    if (this.isInGame && !gameSwitches.isGameOver && data) {
      const { x, y, currentFace } = data;
      const validXY = this.checkMove(x, y, currentFace);
      if (validXY) {
        updateRobot(index, {...data, currentVisualFace: currentFace});
        this.moveRobotForward(validXY, currentFace); 
        this.turn(this.getRight(currentFace), false);
      } else {
        this.turn(this.getLeft(currentFace));
      }        
    }
  }

  followPursuitPath = () => {
    if (this.isInGame && !this.props.gameSwitches.isGameOver && this.props.data) {
      if (this.isBlocked) {
        this.isDoneTwoBlockedMoves = false;
        this.doBlockedPursuitStep('LEFT');
      } else {
        this.doNormalPursuitStep();
      }
    }
  }

  doBlockedPursuitStep = direction => {
    const { data: { x, y, currentFace } } = this.props;
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
    if (this.isInGame && this.props.human.x !== this.props.data.x) {
      this.pursueHuman('x');
    }
    setTimeout(() => {
      if (this.isInGame && this.props.human.y !== this.props.data.y) {
        this.pursueHuman('y');
      }
    }, this.props.delay / 2);
  }

  pursueHuman = axis => {
    const { x, y } = this.props.data;
    const newDirection = axis === 'x' ? this.checkHumanPositionX(x) : this.checkHumanPositionY(y);
    const validXY = this.checkMove(x, y, newDirection);
    if (this.isInGame) {
      this.turn(newDirection);
      if (validXY) {
        this.moveRobotForward(validXY, newDirection);
        this.isBlocked = false;
      } else {
        this.isBlocked = true;
      }
    }
  }

  checkHumanPositionX = x => {
    return this.props.human.x > x ? 'RIGHT' : 'LEFT';
  }

  checkHumanPositionY = y => {
    return this.props.human.y > y ? 'DOWN' : 'UP';
  }

  turn = (newFace, isVisualTurn=true) => {
    if (this.isInGame) {
      this.props.updateRobot(this.props.index, {
        currentFace: newFace,
        currentVisualFace: isVisualTurn ? newFace : this.props.data.currentVisualFace
      });
    }
  }

  moveRobotForward = (nextSpace, newFace) => {
    const { human, updateRobot, data, index } = this.props;
    const { x, y } = nextSpace;
    if (x === human.x && y === human.y) {
      actions.endTheGame(`${data.name} caught you!`);
    } else {
      updateRobot(index, { x, y });
      this.checkForFood(x, y, newFace);
    }
  }

  getLeft = currentFace => {
    return LEFTS[currentFace];
  }

  getRight = currentFace => {
    return RIGHTS[currentFace];
  }

  render() {
    const { data: { currentVisualFace, x, y }, sampleSpaceWidth } = this.props;
    const className = `dog dog-${currentVisualFace.toLowerCase()}`;
    const style = helpers.writeTransform(x * sampleSpaceWidth, y * sampleSpaceWidth);
    return (
      <span className={className} style={style}></span>
    );
  }
}

const mapStateToProps = (state, props) => {
  const data = state.robots[props.index];
  return {
    currentFoods: state.currentFoods,
    boardSpaces: state.boardSpaces,
    gameSwitches: state.gameSwitches,
    delay: state.difficulty,
    human: state.human || {x: 0, y: 0},
    sampleSpaceWidth: state.sampleSpaceWidth,
    gameStyle: state.gameStyle || GAME_STYLE_DEFAULT,
    data
  }
};

export default connect(mapStateToProps, {
  updateRobot: actions.updateRobot,
  updateSimpleState: actions.updateSimpleState
})(Robot);

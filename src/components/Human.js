import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { endTheGame, updateSimpleState } from '../actions/';
import { GAME_STYLE_DEFAULT, HUMAN } from '../constants';
import * as helpers from '../helpers';
import DirectionButtons from './DirectionButtons';
import Player from './Player';

class Human extends Player {
  constructor(props) {
    super(props);
    this.name = 'HUMAN';
  }

  static propTypes = {
    currentFoods: PropTypes.array.isRequired,
    stats: PropTypes.object.isRequired,
    gameSwitches: PropTypes.object.isRequired,
    robots: PropTypes.array.isRequired,
    gameStyle: PropTypes.string.isRequired,
    human: PropTypes.object,
  }

  state = {
    style: helpers.writeTransform(),
    face: 'LEFT'
  }

  componentDidMount() {
    this.isInGame = true;
    const { sampleSpaceWidth } = this.props;
    const startPosition = HUMAN[this.props.gameStyle];
    this.props.updateSimpleState({
      human: {
        ...startPosition,
        style: helpers.writeTransform(
          startPosition.x * sampleSpaceWidth, 
          startPosition.y * sampleSpaceWidth
        )
      }
    });
    this.intervalID = setInterval(() => {
      this.updateEnergy(-1);
    }, 2500);
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    this.isInGame = false;
    clearInterval(this.intervalID);
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress = e => {
    let direction = null;
    if (!this.props.gameSwitches.isGameOver && this.props.human) {
      switch (e.which) {
        case 37:
          direction = 'LEFT';
          break;
        case 38:
          direction = 'UP';
          break;
        case 39:
          direction = 'RIGHT';
          break;
        case 40:
          direction = 'DOWN';
          break;
        default:
          return false;
      }
      this.moveHumanForward(direction);
    }
  }

  moveHumanForward = direction => {
    const { currentFoods, robots, updateSimpleState, human } = this.props;
    const validXY = this.checkMove(human.x, human.y, direction);
    let isRobotNextSpace = false;
    if (this.isInGame) {
      // always face new direction
      updateSimpleState({human: {...human, face: direction}});

      if (validXY) {
        currentFoods.forEach(food => {
          if (food.x === validXY.x && food.y === validXY.y) {
            this.updateEnergy(1);
          }
        });

        robots.forEach((robot) => {
          if (robot.x === validXY.x && robot.y === validXY.y) {
            endTheGame(`You ran into ${robot.name}!`);
            isRobotNextSpace = true;
          }
        });

        if (!isRobotNextSpace) {
          this.checkForFood(validXY.x, validXY.y, direction);
          updateSimpleState({
            human: {
              ...this.props.human, 
              x: validXY.x, 
              y: validXY.y
            }
          });
        }
      }
    }
  }

  updateEnergy = change => {
    const { gameSwitches, stats, updateSimpleState } = this.props;
    if (this.isInGame && ! gameSwitches.isGameOver) {
      if (stats.energy === 0) {
        endTheGame('You ran out of energy!');
      } else {
        updateSimpleState({
          stats: {
            ...stats,
            mealsEaten: change === 1 ? stats.mealsEaten + 1 : stats.mealsEaten,
            energy: stats.energy + change
          }
        });
      }
    }
  }

  render() {
  	const { human, sampleSpaceWidth } = this.props;
    if (human) {
      const className = `cat cat-${human.face.toLowerCase()}`;
      const style = helpers.writeTransform(human.x * sampleSpaceWidth, human.y * sampleSpaceWidth);;
    	return (
        <div>
          <span className={className} style={style}></span>
          {'ontouchstart' in document.documentElement &&
            <DirectionButtons moveHuman={this.moveHumanForward} />
          }
        </div>
      )
    }
    return null;
  }
}

const mapStateToProps = state => {
  return {
    currentFoods: state.currentFoods,
    gameSwitches: state.gameSwitches,
    robots: state.robots || [],
    boardSpaces: state.boardSpaces,
    stats: state.stats,
    sampleSpaceWidth: state.sampleSpaceWidth,
    gameStyle: state.gameStyle || GAME_STYLE_DEFAULT,
    human: state.human || HUMAN[GAME_STYLE_DEFAULT]
  }
}

export default connect(mapStateToProps, {
  updateSimpleState
})(Human);

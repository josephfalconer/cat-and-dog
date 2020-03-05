import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateSimpleState } from '../actions/'
import { GAME_STYLE_DEFAULT } from '../constants';

class FoodLayer extends PureComponent {
  static propTypes = {
    freeBoardSpaces: PropTypes.array.isRequired,
    currentFoods: PropTypes.array.isRequired,
    gameStyle: PropTypes.string.isRequired,
    isFullSizeFoods: PropTypes.bool.isRequired,
    secondsRemaining: PropTypes.number.isRequired,
  }

  componentDidMount() {
    this.isInGame = true;
    setTimeout(this.generateFood, 100);
    this.intervalID = setInterval(this.generateFood, 10000);
  }

  componentWillUnmount() {
    this.isInGame = false;
    clearInterval(this.intervalID);
    this.props.updateSimpleState({
      isFullSizeFoods: false,
      currentFoods: []
    });
  }

  generateFood = () => {
    const noOfFoods = this.props.gameStyle === GAME_STYLE_DEFAULT ? 3 : 5;
    let { freeBoardSpaces } = this.props;
    let currentFoods = [];
    if (this.isInGame && this.props.secondsRemaining >= 10) {
      for (let i = 0; i < noOfFoods; i++) {
        // cut a random space from freeBoardSpaces
        let random = Math.floor(Math.random() * freeBoardSpaces.length);
        let space = freeBoardSpaces.splice(random, 1)[0];
        currentFoods.push({
          x: space.x,
          y: space.y,
          backgroundPosition: this.getFoodType()
        });
      }
      this.props.updateSimpleState({currentFoods});
      setTimeout(this.toggleFullSizeFoods, 50);
      setTimeout(this.toggleFullSizeFoods, 4000);
      setTimeout(this.removeFoods, 5000);
    }
  }

  toggleFullSizeFoods = () => {
    if (this.isInGame) {
      this.props.updateSimpleState({isFullSizeFoods: !this.props.isFullSizeFoods});
    }
  }

  removeFoods = () => {
    if (this.isInGame) {
      this.props.updateSimpleState({currentFoods: []});
    }
  }

  getFoodType = () => {
    const foodBackgroundPositions = ['0%', '16.6666%', '33.3333%', '50%', '66.6666%', '83.3333%', '100%' ];
    const ran = Math.floor(Math.random() * foodBackgroundPositions.length);
    return foodBackgroundPositions[ran];
  }

  render() {
    const { currentFoods, sampleSpaceWidth, isFullSizeFoods } = this.props;
    const foodItemClassName = 'foodlayer__food' + (isFullSizeFoods ? ' grow' : '');
    return currentFoods.length ? (
      <div className="foodlayer">
        {currentFoods.map((food, index) => {
          const foodStyles = {
            left: `${(food.x * sampleSpaceWidth) / 16}rem`,
            top: `${(food.y * sampleSpaceWidth) / 16}rem`,
            width: `${sampleSpaceWidth / 16}rem`,
            height: `${sampleSpaceWidth / 16}rem`,
            backgroundPosition: food.backgroundPosition
          }
          return (
            <span
              style={foodStyles}
              key={`${food.backgroundPosition}-${index}`}
              className={foodItemClassName}
            ></span>
          )
        })}
      </div>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    freeBoardSpaces: state.freeBoardSpaces,
    currentFoods: state.currentFoods,
    gameStyle: state.gameStyle || GAME_STYLE_DEFAULT,
    sampleSpaceWidth: state.sampleSpaceWidth,
    isFullSizeFoods: state.isFullSizeFoods || false,
    secondsRemaining: state.stats.secondsRemaining,
  }
}

export default connect(mapStateToProps, {
  updateSimpleState
})(FoodLayer);

import { PureComponent } from 'react';

export default class extends PureComponent {
  moveForward(x, y, newdirection){
    const { currentFoods, updateSimpleState } = this.props;
    let eatenIndex = 0;

    currentFoods.forEach((food, index) => {
      if (food.x === x && food.y === y) {
        eatenIndex = index + 1;
      }
    });

    if (eatenIndex) {
      const newFoods = currentFoods.filter((food, index) =>
        index !== eatenIndex - 1
      );
      updateSimpleState({currentFoods: newFoods});
    }
  }

  checkMove(x, y, direction) {
    const { boardSpaces } = this.props;
    let forwardX = x;
    let forwardY = y;
    let nextSpace;

    if (direction === 'RIGHT') {
      forwardX++;
    } else if (direction === 'LEFT') {
      forwardX--;
    } else if (direction === 'UP') {
      forwardY--;
    } else if (direction === 'DOWN') {
      forwardY++;
    }

    // limited to garden dimensions
    if (
      forwardX < 0 || 
      forwardY < 0 || 
      forwardX > boardSpaces.length - 1 || 
      forwardY > boardSpaces[0].length - 1
    ) {
      return false;
    }

    nextSpace = boardSpaces[forwardX][forwardY];

    if (nextSpace.occupant === 'OBSTRUCTION') {
      return false;
    }

    return {
      x: forwardX,
      y: forwardY,
      occupant: nextSpace.occupant
    };
  }
}

import { Component } from 'react';

import * as helpers from '../helpers';

export default class extends Component {
    moveForward(x, y, newdirection){
        const spaceWidth = document.getElementById('sample-space').clientWidth;
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

        this.setState({
            ...this.state,
            x: x,
            y: y,
            style: helpers.writeTransform(x * spaceWidth, y * spaceWidth),
            face: newdirection ? newdirection : this.state.face
        });
    }

    checkMove(x, y, direction) {
        const { boardSpaces } = this.props;
        let forwardX = x, forwardY = y, nextSpace;

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
        if (forwardX < 0 || forwardY < 0 || forwardX > boardSpaces.length - 1 || forwardY > boardSpaces[0].length - 1)
            return false;

        nextSpace = boardSpaces[forwardX][forwardY];

        if (nextSpace.occupant === 'OBSTRUCTION')
            return false;

        return {
            x: forwardX,
            y: forwardY,
            occupant: nextSpace.occupant
        };
    }
}

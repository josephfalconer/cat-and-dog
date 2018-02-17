import { Component } from 'react';

import * as helpers from '../actions/helpers';

export default class extends Component {
    moveForward(x, y, newdirection){
        const spaceWidth = document.getElementById('sample-space').clientWidth;
        this.setState({
            ...this.state,
            x: x,
            y: y,
            style: helpers.writeTransform(x * spaceWidth, y * spaceWidth),
            face: newdirection ? newdirection : this.state.face
        });
    }

    checkMove(x, y, direction) {
        const { spaces } = this.props;
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
        if (forwardX < 0 || forwardY < 0 || forwardX > spaces.length - 1 || forwardY > spaces[0].length - 1)
            return false;

        nextSpace = spaces[forwardX][forwardY];

        if (nextSpace.occupant === 'OBSTRUCTION')
            return false;

        return {
            x: forwardX,
            y: forwardY,
            occupant: nextSpace.occupant
        };
    }
}

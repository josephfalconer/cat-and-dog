import { Component, PropTypes } from 'react';

import * as helpers from '../actions/helpers';


export default class extends Component {

    static propTypes = {
        spaces: PropTypes.array.isRequired,
        updateSpaces: PropTypes.func.isRequired
    }

    moveForward(x, y, newdirection){
        let { spaces } = this.props;

        const spaceWidth = document.getElementById('sample-space').clientWidth;

        if (spaces.length) {
            spaces = helpers.removeOccupant(spaces, this.name);
            spaces[x][y].occupant = this.name;
            spaces[x][y].className = null;
        }

        this.setState({
            ...this.state,
            x: x,
            y: y,
            style: helpers.writeTransform(x * spaceWidth, y * spaceWidth),
            face: newdirection ? newdirection : this.state.face
        });

        return spaces;
    }

    checkMove(x, y, direction, spaces) {

        if (direction === 'RIGHT') {
            x++;
        } else if (direction === 'LEFT') {
            x--;
        } else if (direction === 'UP') {
            y--;
        } else if (direction === 'DOWN') {
            y++;
        }

        // limited to garden dimensions
        if (x < 0 || y < 0 || x > spaces.length - 1 || y > spaces[0].length - 1)
            return false;

        const nextSpace = spaces[x][y];

        if (nextSpace.occupant === 'OBSTRUCTION') 
            return false;
        
        return { 
            x: x, 
            y: y,
            occupant: nextSpace.occupant 
        };
    }
}

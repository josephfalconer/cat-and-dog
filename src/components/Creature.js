import { Component } from 'react';
import { bindActionCreators } from 'redux';

import * as GardenActionCreators from '../actions/actions_garden';
import * as helpers from '../actions/helpers';


export default class extends Component {
    moveForward(x, y, newdirection){
        const { dispatch } = this.props,
            updateGarden = bindActionCreators(GardenActionCreators.updateGarden, dispatch),
            squareWidth = 72;

        updateGarden({ x: x, y: y }, this.updateType);

        this.setState({
            ...this.state,
            x: x,
            y: y,
            style: helpers.writeTransform(x * squareWidth, y * squareWidth),
            face: newdirection ? newdirection : this.state.face
        });
    }

    checkMove(x, y, direction) {
        const { spaces } = this.props;
        let nextSpace;

        if (direction === 'right') {
            x++;
        } else if (direction === 'left') {
            x--;
        } else if (direction === 'up') {
            y--;
        } else if (direction === 'down') {
            y++;
        }


        // limited to garden dimensions
        if (x < 0 || y < 0 || x > spaces.length - 1 || y > spaces[0].length - 1)
            return false;


        nextSpace = spaces[x][y];

        if (nextSpace.occupant) 
            return false;
        
        
        return { x: x, y: y };
    }
}

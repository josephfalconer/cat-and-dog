import { Component } from 'react';
import { bindActionCreators } from 'redux';

import * as GardenActionCreators from '../actions/actions_garden';
import * as StatsActionCreators from '../actions/actions_stats';
import * as helpers from '../actions/helpers';


export default class extends Component {
    moveForward(x, y, newdirection){
        const { dispatch } = this.props,
            updateGarden = bindActionCreators(GardenActionCreators.updateGarden, dispatch),
            squareWidth = 72;

        updateGarden({ x: x, y: y }, this.actionType);


        let { spaces } = this.props;
        if (spaces.length) {
            spaces = this.cleanSpaces(spaces);
            spaces[x][y].occupant = this.name;
        }
        

        this.setState({
            ...this.state,
            x: x,
            y: y,
            style: helpers.writeTransform(x * squareWidth, y * squareWidth),
            face: newdirection ? newdirection : this.state.face
        });
    }

    cleanSpaces(spaces) {
        for (let x = 0; x < spaces.length; x++) {
            for (let y = 0; y < spaces[y].length; y++) {
                if (spaces[x][y].occupant === this.name)
                    spaces[x][y].occupant = false;
            }
        }
        return spaces;
    }

    checkMove(x, y, direction) {
        const { dispatch, spaces } = this.props,
            updateStats = bindActionCreators(StatsActionCreators.updateStats, dispatch);

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

        if (nextSpace.occupant === 'DOG') {
            updateStats(false, 'UPDATE_GAME_STATUS');
            console.log('Found the dog!');
        }
            

        if (nextSpace.occupant === 'CAT') {
            updateStats(false, 'UPDATE_GAME_STATUS');
            console.log('Found the cat!');
        }
            

        if (nextSpace.occupant) 
            return false;
        
        
        return { x: x, y: y };
    }
}

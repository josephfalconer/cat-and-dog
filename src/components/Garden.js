import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as GardenActionCreators from '../actions/actions_garden';
import Space from './Space';
import Cat from './Cat';
import Dog from './Dog';


class Garden extends Component {

	static propTypes = {
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
	}

	componentDidMount() {
        const { dispatch } = this.props,
            updateGarden = bindActionCreators(GardenActionCreators.updateGarden, dispatch);

        let SPACES = this.layoutSpaces();

        SPACES = this.setObstructions(SPACES);
        updateGarden(SPACES, 'UPDATE_SPACES');

        this.freeSpaces = this.updateFreeSpaces(SPACES);
        this.setFood();
	}

	layoutSpaces = () => {

		const { width, height } = this.props;
        let SPACES = [];
        
        // create 2d array of x/y spaces
        for (let x = 0; x < width; x++) {

            SPACES[x] = [];

            for (let y = 0; y < height; y++) {

                SPACES[x][y] = {
                    x: x,
                    y: y,
                    occupant: false,
                    isEdge: false
                };

                // garden edges
                if (x === 0 || y === 0 || x === (width - 1) || y === (height - 1) ) {
                    SPACES[x][y].isEdge = true;
                } 
            }
        }

        SPACES[width - 1][height - 1].occupant = 'CAT';
        SPACES[0][0].occupant = 'DOG';

        return SPACES;
	}

    setObstructions = spaces => {
        const noOfObstructions = 10;

        for (let i = 0; i < noOfObstructions; i++) {

            let ranX = Math.floor(Math.random() * this.props.width), 
                ranY = Math.floor(Math.random() * this.props.height);

            if (!spaces[ranX][ranY].isEdge) {
                spaces[ranX][ranY].occupant = 'OBSTRUCTION';
            }   
        }

        return spaces;
    }

    updateFreeSpaces = spaces => {
        let freeSpaces = [];

        for (let x = 0; x < spaces.length; x++) {
            for (let y = 0; y < spaces[x].length; y++) {
                if (!spaces[x][y].occupant) {
                    freeSpaces.push({ x: x, y: y });
                } 
            }
        }

        return freeSpaces
    }

    setFood = () => {
        const noOfFood = 5,
            randomNumbers = [];

        for (var i = 0; i < noOfFood; i++) {
            let ran = Math.floor(Math.random() * this.freeSpaces.length);

            while ( randomNumbers.indexOf(ran) ) {
                
            }

            console.log('hello', ran);
        }

    }

    render() {

        const { spaces:columns } = this.props;

    	return (
    		<div className="garden">
                {columns && columns.map((column, index) => {
                    return (
                        <div className="garden__column" key={index}>
                            {column.map((space, index) => {
                                return (
                                    <Space
                                        key={index}
                                        data={space}
                                    />
                                )
                            })}
                        </div>
                    );
                })}

                <Cat />
                <Dog />
            </div>
    	);
    }
}

const mapStateToProps = state => (
    {
        spaces: state.garden.spaces
    }
);

export default connect(mapStateToProps)(Garden);

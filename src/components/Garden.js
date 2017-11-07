import React, { Component, PropTypes } from 'react';

import Column from './Column';
import DirectionButton from './Button';


export default class Garden extends Component {

	static propTypes = {
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
		difficulty: PropTypes.number.isRequired,     
	};

	componentDidMount() {

              

	}

	componentWillUnmount() {
        
    }

	layoutSpaces = () => {

		let SPACES = [];
		const gWidth = this.props.width,
              gHeight = this.props.height;
            
        // Create spaces according to garden size, in x-y format
        for (let x = 0; x < gWidth; x++) {
            SPACES[x] = [];
            for (let y = 0; y < gHeight; y++) {
                SPACES[x][y] = {
                    isFood: false,
                    occupant: false,
                    id: x + '-' + y
                };
                // Spaces will look like paving stones if at edge of garden
                if (x === 0 || y === 0 || x === (gWidth - 1) || y === (gHeight - 1) ) {
                    SPACES[x][y].isEdge = true;
                } else {
                    SPACES[x][y].isEdge = false;
                }

                // Set the cat
                if (x == this.state.cat.x && y == this.state.cat.y) {
                    SPACES[x][y].occupant = 'cat';
                }

                // Set the dog
                if (x == this.state.dog.x && y == this.state.dog.y) {
                    SPACES[x][y].occupant = 'dog';
                }
            }
        }

        return SPACES;
	};

	setObstructions = spaces => {

        const quantity = Math.floor(this.props.difficulty / 85); 

        for (let i = 0; i < quantity; i++) {
            let ranX = Math.floor(Math.random() * this.props.width), 
                ranY = Math.floor(Math.random() * this.props.height);
            // Keep obstructions from the edge squares
            if (!spaces[ranX][ranY].isEdge) {
                spaces[ranX][ranY].occupant = 'obstruction';
            }   
        }
        return spaces;
    };

    

    setFood = () => {

        

          

    };

    

    render() {
    	return (
            <div>
        		<div className="garden">
                    {this.state.spaces.map(function(column, index) {
                        return (
                            <Column
                                spaces={column}
                                key={index + 1}
                                catFace={this.state.cat.face}
                                dogFace={this.state.dog.face}
                            />
                        )
                    }.bind(this))}
                </div>

                {!this.props.isEndedGame ? 
                    <div className="garden__controls">
                        <div className="controls__inner">
                            {directions.map(function(direction, index) {
                                return (
                                    <DirectionButton
                                        direction={direction}
                                        advanceCat={this.advanceCat} 
                                        key={index}
                                    />
                                )
                            }.bind(this))}
                        </div>
                    </div>
                    :
                    null
                }

            </div>
    	);
    }
};
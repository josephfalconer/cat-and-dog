import React, { Component, PropTypes } from 'react';

import Space from './Space';


export default class Garden extends Component {

	static propTypes = {
		width: PropTypes.number.isRequired,
		height: PropTypes.number.isRequired,
	}

	componentDidMount() {
        this.layoutSpaces();
	}

	layoutSpaces = () => {

		const { width, height } = this.props;
        let SPACES = [];
            
        // Create spaces according to garden size, in x-y format
        for (let x = 0; x < width; x++) {

            SPACES[x] = [];

            for (let y = 0; y < height; y++) {

                SPACES[x][y] = {
                    occupant: false,
                    isEdge: false
                };

                // squares at garden edges
                if (x === 0 || y === 0 || x === (width - 1) || y === (height - 1) ) {
                    SPACES[x][y].isEdge = true;
                } 
            }
        }

        return SPACES;

        console.log(SPACES);
	}

    render() {
    	return (
    		<div className="garden">
                
                
            </div>
    	);
    }
}

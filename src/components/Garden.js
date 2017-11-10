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

        

        return SPACES;
	}

    setObstructions = spaces => {
        // TODO - quantity will be defined by difficulty
        for (let i = 0; i < 10; i++) {

            let ranX = Math.floor(Math.random() * this.props.width), 
                ranY = Math.floor(Math.random() * this.props.height);

            // edges don't have obstructions
            if (!spaces[ranX][ranY].isEdge) {
                spaces[ranX][ranY].occupant = 'OBSTRUCTION';
            }   
        }

        return spaces;
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

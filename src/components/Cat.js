import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as GardenActionCreators from '../actions/actions_garden';
import * as helpers from '../actions/helpers';


class Cat extends Component {

    static propTypes = {
        spaces: PropTypes.array.isRequired,
    }

    state = {
        style: helpers.writeTransform()
    }
    
    componentDidMount() {
        this.updateFace('left');
        this.move(9, 7);
        // set energy-decreasing interval
        document.addEventListener('keydown', this.arrowKeys);
    }

    // same as Dog.js?
    move = (x, y) => {
        const { dispatch } = this.props,
            updateGarden = bindActionCreators(GardenActionCreators.updateGarden, dispatch),
            squareWidth = 72;

        updateGarden({ x: x, y: y }, 'UPDATE_CAT_POSITION');

        this.setState({
            ...this.state,
            x: x,
            y: y,
            style: helpers.writeTransform(x * squareWidth, y * squareWidth),
        });
    }

    // same as Dog.js?
    updateFace = face => {
        this.setState({
            ...this.state,
            className: `cat cat-${face}`
        });
    }

    arrowKeys = e => {
        const { spaces } = this.props;
        let { x, y } = this.state,
            face;
       
        if(e.which === 37) {
            // left
            x--;
            face = 'left';

        } else if (e.which === 38) {
            // up 
            y--;
            face = 'up';

        } else if (e.which === 39) {
            // right
            x++;
            face = 'right';

        } else if (e.which === 40) {
            // down
            y++;
            face = 'down';

        } else {
            return;
        }

        this.updateFace(face);

        if (!helpers.checkMove(x, y, spaces)) 
            return;

        this.move(x, y, face);
    }

    render() {
    	const { style, className } = this.state;
        style.backgroundSize = '75%';

    	return (
	        <span className={className} style={style}></span>
	    )
    }
}

const mapStateToProps = state => (
    {
        spaces: state.garden.spaces
    }
);

export default connect(mapStateToProps)(Cat);

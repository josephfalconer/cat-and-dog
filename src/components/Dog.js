import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as GardenActionCreators from '../actions/actions_garden';
import * as helpers from '../actions/helpers';


class Dog extends Component {

    static propTypes = {
        spaces: PropTypes.array.isRequired,
    }

    state = {
        style: helpers.writeTransform()
    }
    
    componentDidMount() {
        this.updateFace('right');
        this.move(0, 0);

        // set movement interval
        this.intervalID = setInterval(this.findPath, 1000);
    }

    componentWillUnmount() {
    	// clear movement interval
    	window.clearInterval(this.intervalID);
    }

    findPath = () => {
    	const { cat } = this.props;
    	let face;

    	let { x, y } = this.state;

    	if (cat.x > x)
    		x++;

    	if (cat.x < x)
    		x--;

    	if (cat.y > y)
    		y++;

    	if (cat.y < y)
    		y--;

    	// handle dog face
    	if (cat.x > x) {
    		face = 'right';
    	} else {
    		face = 'left';
    	}

    	if (cat.x === x) 
    		face = cat.y < y ? 'up' : 'down';
    	
    	this.updateFace(face);
    	this.move(x, y);
    }

    // same as Cat.js?
    move = (x, y) => {
        const { dispatch } = this.props,
            updateGarden = bindActionCreators(GardenActionCreators.updateGarden, dispatch),
            squareWidth = 72;

        updateGarden({ x: x, y: y }, 'UPDATE_DOG_POSITION');

        this.setState({
            ...this.state,
            x: x,
            y: y,
            style: helpers.writeTransform(x * squareWidth, y * squareWidth),
        });
    }

    // same as Cat.js?
    updateFace = face => {
        this.setState({
            ...this.state,
            className: `dog dog-${face}`
        });
    }

    render() {
    	const { style, className } = this.state;
    	style.backgroundSize = '95%';

    	return (
	        <span className={className} style={style}></span>
	    )
    }
}

const mapStateToProps = state => (
    {
        spaces: state.garden.spaces,
        cat: state.garden.cat
    }
);

export default connect(mapStateToProps)(Dog);

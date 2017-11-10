import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import * as helpers from '../actions/helpers';
import Creature from './Creature';


class Cat extends Creature {

    constructor(props) {
        super(props);
        this.actionType = 'UPDATE_CAT_POSITION';
        this.name = 'CAT';
    }

    static propTypes = {
        spaces: PropTypes.array.isRequired,
    }

    state = {
        style: helpers.writeTransform(),
        face: 'left'
    }
    
    componentDidMount() {
        this.moveForward(9, 7, 'left');
        // TODO energy-decrease interval
        document.addEventListener('keydown', this.arrowKeys);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.arrowKeys);
    }

    arrowKeys = e => {
        let { x, y } = this.state, face, validXY;

        switch (e.which) {
            case 37: 
                face = 'left';
                break;
            case 38:
                face = 'up';
                break;
            case 39:
                face = 'right';
                break;
            case 40:
                face = 'down';
                break;
            default:
                return;
        }

        this.setState({ ...this.state, face: face });
    
        validXY = this.checkMove(x, y, face);

        if (!validXY) 
            return;

        this.moveForward(validXY.x, validXY.y, face);
    }

    render() {
    	const { style, face } = this.state,
            className = `cat cat-${face}`;
            
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

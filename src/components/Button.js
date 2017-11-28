import React, { PropTypes } from 'react';

const DirectionButton = props => {
    return (
        <button 
        	className="garden__control" 
        	onClick={()=>{props.advanceHuman(props.direction)}}
        >
        </button>
    );
} 

//className="is-displayed-lg"
//

DirectionButton.propTypes = {
	advanceHuman: PropTypes.func.isRequired,
	direction: PropTypes.string.isRequired
}

export default DirectionButton;
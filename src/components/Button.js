import React, { PropTypes } from 'react';

const DirectionButton = props => {
    return (
        <button 
        	className="garden__control" 
        	onClick={()=>{props.advanceCat(props.direction)}}
        >
        </button>
    );
} 

//className="is-displayed-lg"
//

DirectionButton.propTypes = {
	advanceCat: PropTypes.func.isRequired,
	direction: PropTypes.string.isRequired
}

export default DirectionButton;
import React, { PropTypes } from 'react';


const occupants = {
    FOOD: (className) => {
        return <i className={className}></i>
    },
    OBSTRUCTION: (className) => {
        return <i className="obstruction"></i>
    }
}

const Space = props => {

    const { data } = props,
        mainClassName = data.isEdge ? 'edge' : 'grass';

    const Occupant = occupants[data.occupant];

    return (
        <div className={`garden__space ${mainClassName}`}>
            {Occupant && Occupant(data.className)}
        </div>
    );
} 

Space.propTypes = {
    data: PropTypes.object.isRequired
}

export default Space;

import React, { PropTypes } from 'react';


const Space = props => {

    const { data } = props,
        className = data.isEdge ? 'edge' : 'grass';


    const occupants = {
        // food: () => {
        //     return <i className={data.classFood}></i>
        // },
        obstruction: () => {
            return <i className="obstruction"></i>
        },
    }

    const Occupant = occupants[data.occupant];

    return (
        <div className={`garden__space ${className}`}>
            {Occupant && Occupant.call()}
        </div>
    );
} 

Space.propTypes = {
    data: PropTypes.object.isRequired
}

export default Space;

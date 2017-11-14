import React, { PropTypes } from 'react';


const Space = props => {

    const { data } = props,
        className = data.isEdge ? 'edge' : 'grass';

    const occupants = {
        FOOD: () => {
            return <i className={data.className}></i>
        },
        OBSTRUCTION: () => {
            return <i className="obstruction"></i>
        },
    }

    const Occupant = occupants[data.occupant];

    return (
        <div className={`garden__space ${className}`} style={{fontSize: '14px'}} >
            {Occupant && Occupant.call()}

        </div>
    );
} 

Space.propTypes = {
    data: PropTypes.object.isRequired
}
//{`x: ${data.x}, y: ${data.y}`}
export default Space;

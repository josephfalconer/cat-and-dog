import React, { PropTypes } from 'react';

import Cat from './Cat';
import Dog from './Dog';



const Space = props => {

    const { data, catFace, dogFace } = props,
        className = data.isEdge ? 'edge' : 'grass';


    const occupants = {
        cat: () => {
            return <Cat face={catFace} />
        },
        dog: () => {
            return <Dog face={dogFace} />
        },
        food: () => {
            return <i className={data.classFood}></i>
        },
        obstruction: () => {
            return <i className="obstruction"></i>
        },
    }

    if (data.occupant) {

        const Occupant = occupants[data.occupant];

        return (
            // Return an edge space with the cat
            <div className={`garden__space ${className}`}>
                {Occupant.call()}
            </div>
        );

    } if (data.isFood) {
        return (
            // Return an edge space with the dog
            <div className={`garden__space ${className}`}>
                <i className={data.classFood}></i>
            </div>
        );

    } else {

        return (
            // Return an empty edge space
            <div className={`garden__space ${className}`}></div>
        );

    }
} 

Space.propTypes = {
    data: PropTypes.object.isRequired,
    catFace: PropTypes.string,
    dogFace: PropTypes.string,
}


export default Space;


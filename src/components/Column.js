import React, { PropTypes } from 'react';

import Space from './Space';


const Column = props => {
    return (
        <div className="garden__column">
            {props.spaces.map(function(space, index) {
                return (
                    <Space
                        data={space}
                        catFace={props.catFace}
                        dogFace={props.dogFace}
                    />
                )
            }.bind(this))}
        </div>
    );
}

Column.propTypes = {
    spaces: PropTypes.array.isRequired,
}

export default Column;



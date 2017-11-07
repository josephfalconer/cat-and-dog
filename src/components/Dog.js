import React, { PropTypes } from 'react';

const Dog = props => {
    var dogClass = "dog dog-" + props.face;
    return (
        <i className={dogClass}></i>
    );  
}

Dog.propTypes = {
    face: PropTypes.string.isRequired
}

export default Dog;

import React, { PropTypes } from 'react';

const Cat = props => {
    
    var catClass = "cat cat-" + props.face;
    return (
        // Class name (up/down etc) can be passed through props
        <i className={catClass}></i>
    );  
}

Cat.propTypes = {
    face: PropTypes.string.isRequired
}

export default Cat;

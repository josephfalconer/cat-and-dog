import React, { PropTypes } from 'react';

const Space = props => {
	const { data } = props;
	const mainClassName = data.isEdge ? 'edge' : 'grass';
	return (
		<div className={`garden__space ${mainClassName}`}>
			{data.occupant === 'OBSTRUCTION' && <i className="obstruction"></i>}
		</div>
	);
} 

Space.propTypes = {
	data: PropTypes.object.isRequired
}

export default Space;

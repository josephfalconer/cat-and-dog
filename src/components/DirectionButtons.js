import React, { PropTypes } from 'react';


const DirectionButtons = props => {

	const buttons = ['up', 'down', 'left', 'right'],
		{ moveCat } = props;

	return (
		<div className='directions'>
			{buttons.map((name, index) => {
				return (
					<button 
						key={index} 
						className={`direction direction--${name}`} 
						onClick={() => { moveCat(name.toUpperCase()); }}
					>
					</button>
				)
			})}
		</div>	
	)
}

DirectionButtons.propTypes = {
	moveCat: PropTypes.func.isRequired
}

export default DirectionButtons;

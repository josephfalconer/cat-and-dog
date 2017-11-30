import React, { PropTypes } from 'react';


const DirectionButtons = props => {

	const buttonNames = ['up', 'down', 'left', 'right'],
		{ moveHuman } = props;

	return (
		<div className='directions'>
			<div className='directions__inner'>
				{buttonNames.map((name, index) => {
					return (
						<button 
							key={index} 
							className={`direction direction--${name}`} 
							onClick={() => { moveHuman(name.toUpperCase()); }}
						>
						</button>
					)
				})}
			</div>
		</div>	
	)
}

DirectionButtons.propTypes = {
	moveHuman: PropTypes.func.isRequired
}

export default DirectionButtons;

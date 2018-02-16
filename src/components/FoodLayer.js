import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateBoardState } from '../actions/actions_board'

class FoodLayer extends PureComponent {
	static propTypes = {
		freeSpaces: PropTypes.array.isRequired,
		currentFoods: PropTypes.array.isRequired,
	}

	componentDidMount() {
		this.generateFood();
		this.intervalID = setInterval(this.generateFood, 10000);
	}

	componentWillUnmout() {
		clearInterval(this.intervalID);
	}
	// pass in available spaces for food

	// every ten seconds generate food
	generateFood = () => {
		// const { freeSpaces } = this.props;

		// console.log(freeSpaces);

		// get a random array from the available spaces
		const newFoods = ['veg', 'fruit', 'pulses'];
		// this.props.updateBoardState({currentFoods: newFoods});

		// in CSS: food spaces have pop up animation and fade/shrink

		// remove after 5 seconds
		setTimeout(this.removeFood, 2000)
	}

	removeFood = () => {

	}

	render() {
		const { currentFoods } = this.props;

		return null;

		return (
			<div className="foodlayer">
				{currentFoods.length && currentFoods.map(food =>
					<span key={food}>{food}</span>
				)}
			</div>
		)
	}
}

const mapStateToProps = state => (
	{
		freeSpaces: state.board.freeSpaces,
		currentFoods: state.board.currentFoods
	}
);

export default connect(mapStateToProps, {
	updateBoardState
})(FoodLayer);
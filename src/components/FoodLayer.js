import React, { SimpleComponent, PropTypes } from 'react';
import { connect } from 'redux';

class FoodLayer extends SimpleComponent {
	static propTypes = {
		availableSpaces: PropTypes.array.isRequired,
	}

	componentDidMount() {
		this.generateFood();
		setTimeout(this.generateFood, 10000);
	}
	// pass in available spaces for food

	// every ten seconds generate food
	generateFood = () => {
		// get a random array from the available spaces
		const newFoods = []

		// in CSS: food spaces have pop up animation and fade/shrink

		// remove after 5 seconds
		setTimeout(this.removeFood, 5000)
	}

	removeFood = () => {

	}
}

const mapStateToProps = state => (
	return {
		availableSpaces: state.board.availableSpaces
	}
);

export default connect(mapStateToProps)(FoodLayer);
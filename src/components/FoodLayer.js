import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateBoard } from '../actions/actions_board'

class FoodLayer extends PureComponent {
	static propTypes = {
		freeSpaces: PropTypes.array.isRequired,
		currentFoods: PropTypes.array.isRequired,
	}

	state = {
		isAvailableFoods: false
	}

	componentDidMount() {
		// this.generateFood();
		setTimeout(this.generateFood, 100);
		// this.intervalID = setInterval(this.generateFood, 10000);
	}

	componentWillUnmount() {
		clearInterval(this.intervalID);
	}

	generateFood = () => {
		let { freeSpaces } = this.props;
		let newFoods = [];

		for (let i = 0; i < 10; i++) {
			// cut a random space out of freeSpaces
			let random = Math.floor(Math.random() * freeSpaces.length);
			let splicedCoords = freeSpaces.splice(random, 1);
			newFoods.push({
				x: splicedCoords[0][0],
				y: splicedCoords[0][1],
				className: this.getFoodType() 
			});
		}

		// in CSS: food spaces have pop up animation and fade/shrink
		this.props.updateBoard(newFoods, 'UPDATE_CURRENT_FOODS');
		// remove after 5 seconds
		// setTimeout(this.removeFood, 5000);
	}

	removeFood = () => {
		this.props.updateBoard([], 'UPDATE_CURRENT_FOODS');
	}

	getFoodType = () => {
        const foods = [ 'fish', 'meat', 'steak', 'slice', 'drumstick', 'salami', 'sausage' ];
        const ran = Math.floor(Math.random() * foods.length);
        return `food ${foods[ran]}`;
    }

    // componentWillReceiveProps() {
    // 	console.log('componentWillReceiveProps');
    // }

	render() {
		const { currentFoods } = this.props;
		let spaceWidth = document.getElementById('sample-space').clientWidth;

		console.log(currentFoods);

		return (
			<div className="foodlayer" style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%'}}>
				{currentFoods.length && currentFoods.map((food, index) => {
					const foodStyles = {
						left: `${(food.x * spaceWidth) / 16}rem`,
						top: `${(food.y * spaceWidth) / 16}rem`,
						width: `${spaceWidth / 16}rem`,
						height: `${spaceWidth / 16}rem`,
						transform: 'none',
					}
					return (
						<i 
							style={foodStyles}
							key={`${food.className}-${index}`} 
							className={food.className}
						></i>
					)
				}
				)}
			</div>
		)
	}
}

const mapStateToProps = state => {
	// console.log(state.board.currentFoods);
	return {
		freeSpaces: state.board.freeSpaces,
		// currentFoods: state.board.currentFoods
	}
}

export default connect(mapStateToProps, {
	// updateBoardState,
	updateBoard
})(FoodLayer);
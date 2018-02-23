import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateBoardState } from '../actions/actions_board'

class FoodLayer extends PureComponent {
	static propTypes = {
		freeSpaces: PropTypes.array.isRequired,
		currentFoods: PropTypes.array.isRequired,
	}

	state = {
		isFullSizeFoods: false
	}

	componentDidMount() {
		setTimeout(this.generateFood, 100);
		this.intervalID = setInterval(this.generateFood, 10000);
	}

	componentWillUnmount() {
		clearInterval(this.intervalID);
	}

	generateFood = () => {
		let { freeSpaces } = this.props;
		let newFoods = [];

		for (let i = 0; i < 3; i++) {
			// cut a random space out of freeSpaces
			let random = Math.floor(Math.random() * freeSpaces.length);
			let space = freeSpaces.splice(random, 1)[0];
			newFoods.push({
				x: space.x,
				y: space.y,
				className: this.getFoodType()
			});
		}
		this.props.updateBoardState({currentFoods: newFoods});
		this.setState({isFullSizeFoods: true})
		setTimeout(() => this.setState({isFullSizeFoods: false}), 4000);
		setTimeout(this.removeFoods, 5000);
	}

	removeFoods = () => {
		this.props.updateBoardState({currentFoods: []});
	}

	getFoodType = () => {
        const foods = [ 'fish', 'meat', 'steak', 'slice', 'drumstick', 'salami', 'sausage' ];
        const ran = Math.floor(Math.random() * foods.length);
        return `foodlayer__food ${foods[ran]}`;
    }

	render() {
		const { currentFoods } = this.props;
		const spaceWidth = document.getElementById('sample-space').clientWidth;

		return currentFoods.length ? (
			<div className="foodlayer">
				{currentFoods.map((food, index) => {
					const foodStyles = {
						left: `${(food.x * spaceWidth) / 16}rem`,
						top: `${(food.y * spaceWidth) / 16}rem`,
						width: `${spaceWidth / 16}rem`,
						height: `${spaceWidth / 16}rem`,
					}
					let className = food.className;
					className += this.state.isFullSizeFoods ? ' grow' : '';
					return (
						<span
							style={foodStyles}
							key={`${food.className}-${index}`}
							className={className}
						></span>
					)
				})}
			</div>
		) : null
	}
}

const mapStateToProps = state => {
	return {
		freeSpaces: state.board.freeSpaces,
		currentFoods: state.board.currentFoods
	}
}

export default connect(mapStateToProps, {
	updateBoardState
})(FoodLayer);
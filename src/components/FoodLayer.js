import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';

import { updateSimpleState } from '../actions/'

class FoodLayer extends PureComponent {
	static propTypes = {
		freeBoardSpaces: PropTypes.array.isRequired,
		currentFoods: PropTypes.array.isRequired,
	}

	state = {
		isFullSizeFoods: false
	}

	componentDidMount() {
		this.isInGame = true;
		setTimeout(this.generateFood, 100);
		this.intervalID = setInterval(this.generateFood, 10000);
	}

	componentWillUnmount() {
		this.isInGame = false;
		clearInterval(this.intervalID);
	}

	generateFood = () => {
		let { freeBoardSpaces } = this.props;
		let currentFoods = [];
		if (this.isInGame) {
			for (let i = 0; i < 3; i++) {
				// cut a random space from freeBoardSpaces
				let random = Math.floor(Math.random() * freeBoardSpaces.length);
				let space = freeBoardSpaces.splice(random, 1)[0];
				currentFoods.push({
					x: space.x,
					y: space.y,
					className: this.getFoodType()
				});
			}
			this.props.updateSimpleState({currentFoods});
			this.setState({isFullSizeFoods: true})
			setTimeout(() => {
				if (this.isInGame) {
					this.setState({isFullSizeFoods: false})
				}
			}, 4000);
			setTimeout(this.removeFoods, 5000);
		}
	}

	removeFoods = () => {
		if (this.isInGame) {
			this.props.updateSimpleState({currentFoods: []});
		}
	}

	getFoodType = () => {
        const foods = [ 'fish', 'meat', 'steak', 'slice', 'drumstick', 'salami', 'sausage' ];
        const ran = Math.floor(Math.random() * foods.length);
        return `foodlayer__food ${foods[ran]}`;
    }

	render() {
		const { currentFoods, sampleSpaceWidth } = this.props;
		return currentFoods.length ? (
			<div className="foodlayer">
				{currentFoods.map((food, index) => {
					const foodStyles = {
						left: `${(food.x * sampleSpaceWidth) / 16}rem`,
						top: `${(food.y * sampleSpaceWidth) / 16}rem`,
						width: `${sampleSpaceWidth / 16}rem`,
						height: `${sampleSpaceWidth / 16}rem`,
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
		freeBoardSpaces: state.freeBoardSpaces,
		currentFoods: state.currentFoods,
		sampleSpaceWidth: state.sampleSpaceWidth
	}
}

export default connect(mapStateToProps, {
	updateSimpleState
})(FoodLayer);
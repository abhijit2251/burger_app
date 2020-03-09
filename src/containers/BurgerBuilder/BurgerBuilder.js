import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components//Burger/OrderSummary/OrderSummary'

const INGREDENT_PRICE = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	becon: 0.7
}

class BurgerBuilder extends Component {

	// constructor(props){
	// 	super(props);
	// 	this.state = {...}
	// }

	state = {
		ingredients: {
			salad: 0,
			becon: 0,
			cheese: 0,
			meat: 0
		},
		totalPrice: 4,
		purchasable: false,
		purchasing: false
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(igKey => {
				return ingredients[igKey]
			})
			.reduce((sum, el) => {
				return sum + el;
			}, 0)
		this.setState({ purchasable: sum > 0 })
	}

	addIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDENT_PRICE[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) {
			return;
		}
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDENT_PRICE[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true });
	}

	puchaseCancelHandler = () => {
		this.setState({ purchasing: false });
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		}
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0;
		}
		//{salad: true, meat:false}
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.puchaseCancelHandler}>
					<OrderSummary ingredients={this.state.ingredients} />
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls
					ingredientsAdded={this.addIngredientHandler}
					ingredientsRemoved={this.removeIngredientHandler}
					disabled={disabledInfo}
					purchasable={this.state.purchasable}
					ordered={this.purchaseHandler}
					price={this.state.totalPrice} />
			</Aux>
		);
	}
}

export default BurgerBuilder;
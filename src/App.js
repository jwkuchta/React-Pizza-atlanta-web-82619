import React, { Component, Fragment } from 'react';
import Header from './components/Header'
import PizzaForm from './components/PizzaForm'
import PizzaList from './containers/PizzaList'

const pizzaUrl = 'http://localhost:3000/pizzas'

class App extends Component {

  constructor() {
    super()
    this.state = {
      pizzas: [],
      thisPizza: {
        topping: '',
        vegetarian: true,
        size: ''
      }
      // thisPizza: {}
    }
  }

  componentDidMount() {
    fetch(pizzaUrl)
    .then(resp => resp.json())
    .then(pizzaData => this.setState({pizzas: pizzaData}))
    .then(console.log(this.state.pizzas))
  }

  editPizza = pizza => {
    this.setState({
      thisPizza: pizza
    })
  }

  chooseTopping = (e) => {
    this.setState({
      thisPizza: {...this.state.thisPizza,
        topping: e.target.value
      }
    
    // this.setState({thisPizza: {topping: e.target.value})
      
    })
    console.log(this.state)
  }

  chooseSize = (e) => {
    this.setState({
      thisPizza: {...this.state.thisPizza,
        size: e.target.value
      }
    })
    console.log(e.target.value)
  }

  handleCheck = (boolean) => {
    this.setState({
      thisPizza: {...this.state.thisPizza,
        vegetarian: boolean
      }
    })
    console.log(boolean)
  }

  handleSubmit = (newPizza) => {
    fetch(`http://localhost:3000/pizzas/${newPizza.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(newPizza)
    })
    .then(resp => resp.json())
    .then(pizzaData => {
      let changedPizzas = this.state.pizzas.map(pizza => {
        if (pizza.id === pizzaData.id){
          return pizzaData
        } else {
          return pizza
        }
      })
      this.setState({pizzas: changedPizzas})
    })
  }

  render() {
    return (
      <Fragment>
        <Header/>
        <PizzaForm 
        pizza={this.state.thisPizza} 
        chooseTopping={this.chooseTopping}
        chooseSize={this.chooseSize} 
        handleCheck={this.handleCheck} 
        handleSubmit={this.handleSubmit} />
        <PizzaList 
        pizzas={this.state.pizzas}
        editPizza={this.editPizza} />
      </Fragment>
    );
  }
}

export default App;

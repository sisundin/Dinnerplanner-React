import React from 'react';
import {Link} from 'react-router-dom';
const h = React.createElement;


export default class SummaryView extends React.Component{
   constructor(props){
    super(props)
        this.props = props;
      this.state = {
      ingredients: this.props.model.getShoppingList(), 
      guests: this.props.model.getNumberOfGuests()
      }
       
   }
   
   update() {
        
    this.setState({
        ingredients: this.props.model.getShoppingList(), 
        guests: this.props.model.getNumberOfGuests()
    })
  }


componentDidMount() {
    this.props.model.addObserver(() => this.update());
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

render(){
    return h("div", {} ,h("span" ,{},`Dinner for `+ this.state.guests + ` people`), 

        <Link to= '/search'>
            <button className="navigationbutton" onClick={() =>{ 
                
                document.getElementById("summary").classList.add('hide');
                document.getElementById("search").classList.remove('hide');
                }}>
            Back to search
            </button>
        </Link>    
        ,
        h("table" ,{}, 
        h("tr" ,{}, h("th", {}, " Ingredient"), h("th", {},"supermarket aisle"),h("th", {}, "amount")),
        this.state.ingredients.map(ingredient=> h("tr",{}, h("td" ,{}, ingredient.name), 
        h("td", {}, ingredient.aisle) , h("td", {}, ingredient.amount * this.state.guests))),
        h("tr",{}, h("th",{}, "Total Price:") , h("th" ,{}, this.getTotalPrice(this.state.ingredients, this.state.guests)), h("th",{}, "SEK"))
        ))}
    

    
getTotalPrice(ingredients, guests) {
    let list = ingredients;
    let price = 0;
    list.forEach(ingredient =>{ price = price + ingredient.amount});

    return price*guests
}
}
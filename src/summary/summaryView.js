import React from 'react';
import {Link} from 'react-router-dom';
const h = React.createElement;


export default function SummaryView(props){
    const [Ingredients, setIngrdients] = React.useState(props.model.getShoppingList()); 
    const [Guests, setGuests]= React.useState(props.model.getNumberOfGuests());
    React.useEffect(() => {
        const obs =() =>{
        setGuests(props.model.getNumberOfGuests());
        setIngrdients(props.model.getShoppingList());
        };
        props.model.addObserver(obs);
        return ()=> props.model.removeObserver(obs);
        }, [props]);
        
      
        return h("div", {} ,h("span" ,{}, `Dinner for ${Guests} people `), 
        <Link to= '/'>
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
        Ingredients.map(Ingredient=> h("tr",{}, h("td" ,{}, Ingredient.name), 
        h("td", {}, Ingredient.aisle) , h("td", {}, Ingredient.amount * Guests))),
        h("tr",{}, h("th",{}, "Total Price:") , h("th" ,{}, getTotalPrice(Ingredients, Guests)), h("th",{}, "SEK"))
        ))}
    
    
function getTotalPrice(ingredients, guests) {
    let list = ingredients;
    let price = 0;
    list.forEach(ingredient =>{ price = price + ingredient.amount});

    return price*guests
}




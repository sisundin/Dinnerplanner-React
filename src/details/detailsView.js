import React from 'react';
import {Link} from 'react-router-dom';

const h = React.createElement;



export default function DishDetailsView ({
    dish, 
    addControl:[addAction, addMessage], 
    onCancel:[cancelAction, cancelMessage], 
    price, 
    guests, 
    inMenu}){ 
    return h("div", {},
    h("p" ,{}, "Name: "+ dish.title), 
    <p> Type:  {dish.dishTypes.map(dish => <span>{dish}, </span>)}</p>, 
    h("p" , {},"Price: " + price), 
    h("img", {src: dish.image}), 
    h("div" ,{className: "instructionstext"}, h("p",{},dish.instructions)),
    h("div" ,{}, 
    inMenu?h("button", {class:"navigationbutton", onClick: addAction, label:addMessage},"Add to menu"): h("span",{},"Dish is in menu!")),
    h("div", {}, 
    
    <Link to= '/'>
            <button className="navigationbutton" onClick={() =>{ 
                document.getElementById("details").classList.add('hide')
                document.getElementById("search").classList.remove('hide')
                }}>
            Back to search
            </button>

    </Link>
  
    ),
    h("table", {}, 
    h("tr" ,{}, 
    h("th", {}," Ingredient"), h("th",{}, "amount")),
    dish.extendedIngredients.map(ingredient=> h("tr",{}, h("td" ,{}, ingredient.name), h("td", {}, ingredient.amount * guests)))),
    h('a', {href: dish.sourceUrl}, 'CLICK HERE FOR MORE DISH DETAILS')
    )}



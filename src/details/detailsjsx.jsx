import React from 'react';
export default function createDishDisplay({
    dish, 
    addControl:[addAction, addMessage], 
    onCancel:[cancelAction, cancelMessage], 
    price, 
    guests, 
    inMenu}) {return <div>
    <p>
        Name: ${dish.title}
    </p>
    <p>
        Type: ${dish.dishTypes.map(dishtype => <span>${dishtype} , </span>)}
    </p>
    <p>
        Price: ${price}
    </p>
    <image src = {dish.image} alt = "image not found"/>
    <p>${dish.instructions}</p>
    <div>
        ${inMenu?<button className = "navigationbutton"></button>: <span className = "navigationbutton">"Dish is in menu!</span>}
    </div>
    <div>
        <button className = "navigationbutton">Back to search</button>
    </div>
    <table>
        <tr><th>Ingredient</th><th>Amound</th></tr>
        ${dish.extendedIngredients.map(ingredient=> 
        <tr>
            <td>${ingredient.name}</td>
            <td>${ingredient.amount * guests}</td>


        </tr>)}
    </table>
    <a href = {dish.sourceUrl}>CLICK HERE FOR MORE DISH DETAILS</a>
</div>}
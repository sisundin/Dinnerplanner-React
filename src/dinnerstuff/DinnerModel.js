import React  from "react";
import {ENDPOINT, API_KEY} from "./apiConfig"

class DinnerModel extends React.Component{
    constructor(guests=2, dishes=[]){
        super();
        this.numberOfGuests=guests;
        this.subscribers=[];
        this.dishes=dishes;
    
        }
        
    
    setNumberOfGuests(x){
        this.numberOfGuests=x; 
        this.notifyObservers() // TODO

    }
    getNumberOfGuests(){
        return this.numberOfGuests; // TODO
    }

    
    addObserver(callback){
        this.subscribers.push(callback);
 }

    removeObserver (callback) {
    callback = this.subscribers.filter(o => o !== callback);
    };
   
    notifyObservers(whatHappened){
        this.subscribers.forEach(function(callback){ 
            callback(whatHappened);
       });
    }
     
    dishInMenu(dish){
        let array = this.dishes.filter(function(di){ return di.id === dish.id });
        if(array.length < 1 || array === undefined){
            return true;
        }
        return false;
    }  

    getDishPrice(dish){
        this.dishprice = this.sum(dish.extendedIngredients) * this.getNumberOfGuests();
        return this.dishprice;
    }

    sum(input){
             
        if (toString.call(input) !== "[object Array]")
           return false;
             
                   var total =  0;
                   for(var i=0;i<input.length;i++)
                     {                  
                       if(isNaN(input[i].amount)){
                       continue;
                        }
                         total += Number(input[i].amount);
                      }
                    return total;
                   }
  

    addToMenu(dish){
        const uniqify = (array, key) => array.reduce((prev, curr) => 
        prev.find(a => a[key] === curr[key]) ? prev : prev.push(curr) && prev, []);
        this.dishes=[...this.dishes, dish];
        this.dishes = uniqify(this.dishes, 'id')
        this.notifyObservers({
            add_dish: dish
        })
    }
    

    getApiData(string) {
        return fetch ( ENDPOINT+string, {
            "method": "GET",
            "headers": {
            'X-Mashape-Key' : API_KEY
        } ,               

    }).then(response => this.handleHTTPError(response))
        .then(response => response.json())
        .catch(error => console.log(error));
         
    }
    

    searchDishes(dishType="", freeText="") {
    
        return this.getApiData("recipes/search?type="+dishType+"&query="+freeText).then(data=>data.results)   // from headers to response data   
        
    }
    handleHTTPError(response) {
        if(response.ok)
           return response;
        throw Error(response.statusText);
      }

    getDishDetails(id="837136"){
        return this.getApiData("recipes/"+id+"/information")
    }

    getMenu(){
        return [...this.dishes]
    }

    removeFromMenu(dishid){
        this.dishes = this.dishes.filter(dish => dish.id !== dishid);
        this.notifyObservers({removed:dishid});

    
    }

    getShoppingList(){
        this.shoppingListObj= []
        this.getMenu().forEach(dish => 
        dish.extendedIngredients.forEach(ingredient => {
        if (this.shoppingListObj.find(listobject => listobject.name === ingredient.name)){
            this.shoppingListObj.forEach( dubble => {                   
                 if (dubble.name === ingredient.name) {
                        dubble.amount += ingredient.amount;
                    }
            })
                
            }
        else {
            this.shoppingListObj.push({name: ingredient.name , aisle: ingredient.aisle , amount: ingredient.amount});
            }
        }));
        let x = this.shoppingListObj.sort(function(a,b) 
        {if (a.aisle < b.aisle){return -1;}
        if (a.aisle > b.aisle){return 1;}
        else {return 0;}
        });
        x = x.sort(function(a,b) 
        {if (a.aisle === b.aisle && a.name < b.name){return -1;}
        if (a.aisle === b.aisle && a.name < b.name) {return 1;}
        else {return 0;} 
        });
        return x;
        }
      
        
       
    
}

const modelString= localStorage.getItem("dinnerModel");
let modelObject= JSON.parse(modelString);
modelObject?console.log("User data detected"): modelObject= {guests: 2, dishes: []}

const dinnerModel = new DinnerModel(modelObject.guests, modelObject.dishes);
export default dinnerModel;
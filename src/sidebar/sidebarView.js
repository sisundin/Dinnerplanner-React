// js/summary/summaryView.js
import React from 'react';
import {Link} from 'react-router-dom';
const h = React.createElement;


export default class SidebarView extends React.Component{
    constructor(props){
        super(props)
        this.props = props;
        // we put on state the properties we want to use and modify in the component
        this.state = {
            
        };
        this.menuprice = 0;
        this.dishtypesort= {"starter": 1 , "main course" : 2 , "dessert": 3 };
        
        }


    add(value){
      if (value === -1 && this.props.model.getNumberOfGuests() === 1){
        
       }
      else{
        this.props.model.setNumberOfGuests(this.props.model.getNumberOfGuests()+value)
      }}

    removeDish(id){
      this.props.model.removeFromMenu(id)
    }
    
    
    update() {
        
        this.setState({
          
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
        localStorage.setItem("dinnerModel", 
        JSON.stringify({guests: this.props.model.getNumberOfGuests(), dishes: this.props.model.getMenu()}))

        this.menuprice = 0;
        return h("div",{}, 
        h("button", {onClick: () => this.add(-1)}, "-"),
        h("span", {}, this.props.model.getNumberOfGuests()),
        h("button", {onClick: () => this.add(1)}, "+"),
        h("div",{},
        h("table", {},
        h("tr" ,{}, h("th",{}, "Dish name"), h("th", {},"Dish price (SEK)")),
            this.props.model.getMenu().sort( function(a, b){
            if(a.dishTypes.includes("starter")){return -1}
            else if(a.dishTypes.includes("main course") && b.dishTypes.includes("dessert")){return -1}
            else if(a.dishTypes.includes("dessert")){return 1}
            return {}} 
            ).map(dish=> h("tr",{}, 
            <Link to= {'/details/' + dish.id}> 
            <td  onClick={()=> {
              document.getElementById("search").classList.add('hide');
            document.getElementById("details").classList.remove('hide');

            }}> {dish.title} </td> </Link>, h("td",{},  this.getdishprice(dish)), h("button",{onClick: () => {this.removeDish(dish.id)}}, "delete"))),
        h("tr",{}, h("td",{}, "Total dinner price: "), h("td", {}, this.menuprice))
        )));
        
    }



    getdishprice(dish){
        this.dishprice = sum(dish.extendedIngredients) * this.props.model.getNumberOfGuests();
        this.menuprice = this.menuprice + this.dishprice;
        return this.dishprice
    }

}

function sum(input){
             
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
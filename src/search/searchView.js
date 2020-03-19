import React from 'react';
import RenderPromise from '../otil/renderPromise.js'
import {Link} from 'react-router-dom';



const h = React.createElement;


export default class SearchView extends React.Component{
    constructor(props){
        super(props);
        this.props = props;
        this.state = {
            select:"",
            freetext:""
            
        };
        
    }

    update() {
        this.setState({
            select: document.getElementById("selectInput").value,
            freetext:document.getElementById("searchInput").value
        })
      }
    
    componentDidMount() {
        //this.updateSearchResults()
        this.props.model.addObserver(() => this.update());
      }
      // this is called when component is removed from the DOM
      // good place to remove observer
    componentWillUnmount() {
        this.props.model.removeObserver(this)
      }
      
    render(){
        const dishtypearray = ["starter", "main course", "dessert"];
        return h("div", {},  
         h("div", {},
            <input id="searchInput" />  ,// free text search box
            <select id = 'selectInput'>
                <option value="">Choose:</option>
                {dishtypearray.map(opt => h("option", {value: opt}, opt))}
                </select> 
            ,  

            h("button",{onClick: () => this.update()}, "Search!"), // search button
            
            <Link to= '/summary'>
            <button className="navigationbutton" onClick={() =>{ 
                document.getElementById("search").classList.add('hide');
                document.getElementById("summary").classList.remove('hide');
                }}>
            Summary 
            </button>
        
            </Link>),
            //document.getElementById("search").classList.add('hide');
            //document.getElementById("summary").classList.remove('hide');
             // end of search box document.getElementById("selectInput").value document.getElementById("searchInput").value
            
            h("div",{id:"searchresult" }, // empty div for search results
            <RenderPromise 

            promise =  {this.props.model.searchDishes( this.state.select, this.state.freetext ) }  //({data})=>h("span",{}, data)
            renderData = { ({data}) =>  data.map(dish => h("span", {} , this.createDishDisplay(dish)))}
                        />
        ))
         // initially populate the resultDiv with nice dish images
         //dish.extendedIngredients.map(ingredient=> h("tr",null, h("td" ,null, ingredient.name)

         //(data => {h("div", null, data.map(dish => this.createDishDisplay(dish)))})
    }
    
    createDishDisplay(dish){
    let dishimage = "https://spoonacular.com/recipeImages/"+ dish.image;
    
      return <Link to= {'/details/' + dish.id}>
        <span className= "food" id= {dish.id} onClick = {() => {
            document.getElementById("search").classList.add('hide');
            document.getElementById("details").classList.remove('hide');
            }}>
        <span>{dish.title}</span>
        <img src = {dishimage} alt = ""></img>
        </span>           
        </Link>
        
    }
    
    
    isDishRepresentation(clickedNode){
        
        
        if(clickedNode.className.includes("food") === true) {
            return clickedNode.getAttribute("id")
            
        }

        if( clickedNode.parentElement.className.includes("food") === true){  
                return clickedNode.parentElement.getAttribute("id")
        }

        else{
            
             return null
        }
    

    }


}


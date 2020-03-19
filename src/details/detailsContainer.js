import React from 'react';
import RenderPromise from '../otil/renderPromise.js'
import DishDetailsView from './detailsView';
const h = React.createElement;


export default class DishDetailsContainer extends React.Component{
        constructor(props){
                super(props) 
                
                this.props = props;
                this.currentDish = this.props.dishid;
                
                this.state = {
                        id: this.props.dishid ,
                        guests: this.props.model.getNumberOfGuests()
                                };
        //this.onAdd = onAdd;
    //this.onAddCallback = onAdd[0];
    //this.onAddLabel = onAdd[1];
    //this.onCancelCallback=onCancel[0];
    //this.onCancelLabel=onCancel[1];    
                

        }

       
        

        update() {
        this.setState({   
                id:this.props.dishid   ,
                guests: this.props.model.getNumberOfGuests()
        }); 
        
                        }
    
        componentDidMount() {
                
                this.props.model.addObserver(() => this.update());

                }
      // this is called when component is removed from the DOM
      // good place to remove observer
        componentWillUnmount() {
                this.props.model.removeObserver(this);
                                 }

        createDishDisplay(dish){ 
                
            return <DishDetailsView 
                dish = {dish} 
                addControl = {[ ()=>{ this.props.model.addToMenu(dish)
                                    
                            }, this.onAddLabel]}
                onCancel= {[ ()=>{
                                document.getElementById("details").classList.add('hide')
                                document.getElementById("search").classList.remove('hide')
                                    
                            }, this.onCancelLable]}
                price= {this.props.model.getDishPrice(dish)}
                guests= {this.state.guests}
                inMenu= {this.props.model.dishInMenu(dish)}
                />
                                        }
                                        
        render(){
                this.currentDish = this.props.dishid;
                return h("div", {} , <RenderPromise 
                promise=  {this.props.model.getDishDetails(this.currentDish)}
                renderData = {({data}) => h("div", {}, this.createDishDisplay(data))}
                />)
        }


}



 
import React from 'react';
import './App.css';
import dinnerModel from './dinnerstuff/DinnerModel.js'
import SidebarView from './sidebar/sidebarView';
import SearchView  from './search/searchView';
import SummaryView from './summary/summaryView';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom"
import DishDetailsContainer from './details/detailsContainer'












class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  } 


  render(){
    return (
      <Router>
        <Switch>
          <div className="App flexParent ">
          <React.Fragment></React.Fragment>
            <div className = "sidebar debug">
            <SidebarView model={dinnerModel}/>
            </div>
            <React.Fragment></React.Fragment>
            <div className = "mainContent debug" id = "search">
              <Route path="/" render={() => <SearchView model={dinnerModel}/>}/>
            </div>
            <React.Fragment></React.Fragment>
            <div className = "mainContent hide debug" id="details">
              <Route path="/details/:Id" render={(props) => <DishDetailsContainer dishid={props.match.params.Id} model={dinnerModel}/>}/>
            </div>
            <React.Fragment></React.Fragment>
            <div className = "mainContent hide debug" id= "summary">
              <Route path="/summary" render={() => <SummaryView model={dinnerModel}/>}/>
            </div>
            <React.Fragment></React.Fragment>
          </div>
          </Switch>
      </Router>
    );
 
  }
}

export default App;

//<div className = "mainContent hide debug" id="details">
  //      <DishDetailsContainer model = {dinnerModel}/>
    //    </div>
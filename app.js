const modelString= localStorage.getItem("dinnerModel");
let modelObject= JSON.parse(modelString);
if (modelObject === undefined){ modelObject = {}}
const model= new DinnerModel(modelObject.guests, modelObject.dishes);
const summaryNav=[()=> show("summary"), "Summary"];
const backToSearch=[()=> show("search"), "Back to search"];
const addToMenu=[()=> show("search"), "Add to menu"];
const details = new DishDetailsContainer(model, document.body.querySelector("#details"), addToMenu, backToSearch);
new SidebarController(model, document.body.querySelector("#sidebar"));
new SummaryController(model, document.body.querySelector("#summary"),backToSearch);
new SearchController(model, document.body.querySelector("#search"), summaryNav,
     id=> {
         details.render(id);    
         show("details")
       });
       

window.onhashchange = show("search");

function handleHTTPError(response) {
    if(response.ok)
       return response;
    throw Error(response.statusText);
  }





function show(section){
   document.body.querySelector("#search").classList.add("hide")
   document.body.querySelector("#summary").classList.add("hide")
   document.body.querySelector("#details").classList.add("hide")
   var doc = document.body.querySelector("#"+section+"").classList;
   window.location.hash = section
   doc.remove("hide");
   
}


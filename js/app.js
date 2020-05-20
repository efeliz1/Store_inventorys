
  //change function style of searching
  
  // function
  // dropdown of location of stores
  function buildDropDown()
  {
    let eventDD = document.getElementById("eventDropDown");
    let distinctStores = [...new Set(stores.map(store_name => store_name.city))];
  
    let linkHTMLEnd = '<div class="dropdown-divider"></div><a class="dropdown-item" onclick="getEvents(this)" data-string="All" >All</a>';
    let resultHTML = ""; 
    
    for (let index = 0; index < distinctStores.length; index++) 
    {
      resultHTML = resultHTML + `<a class="dropdown-item" onclick="getStores(this)" data-string="${distinctStores[index]}">${distinctStores[index]}</a>`;  
    }
  
    resultHTML = resultHTML + linkHTMLEnd;
  
    eventDD.innerHTML = resultHTML;
    displayStats();
    displayData();
  }

  function getStores(element)
  {
    let curStores = JSON.parse(localStorage.getItem("storesArray")) || stores;
    let city = element.getAttribute("data-string");
    filteredStores = curStores;
    document.getElementById('statsHeader').innerHTML = `Stats For ${city} Inventorys`;
    if (city != "All"|| "all") {
      filteredStores = stores.filter(function(name){
          if (name.city == city) {
              return name;
          }
      })
    }
    displayStats();
  }
  // display
  function displayStats()
  {
    //total average most least
    let average = 0;
    let most = 0;
    let least = -1;
    let total = 0;
    let currentSales = 0;
    
    for (let index = 0; index < filteredStores.length; index++) {
      currentSales = filteredStores[index].Euro_sales;
      total = total + currentSales;

      
      if(most < currentSales)
      {
        most = currentSales;
      }
      if(least > currentSales || least < 0)
      {
        least = currentSales;
      }
      
    }

    average = Math.floor(total/filteredStores.length);
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("least").innerHTML = least.toLocaleString();
  }
function displayData()
{
  const template = document.getElementById("storeData-template");
  const storeBody = document.getElementById("storeBody");
  //clear table
  storeBody.innerHTML = "";

  let curStores = JSON.parse(localStorage.getItem("storesArray")) || [];

  if (curStores.length == 0) 
  {
    curStores = stores;
    localStorage.setItem("storesArray", JSON.stringify(curStores));    
  }

  for (let index = 0; index < curStores.length; index++) {
    const storeRow = document.importNode(template.content,true);
    storeRow.getElementById("unit").textContent = curStores[index].unit;
    storeRow.getElementById("name").textContent = curStores[index].store_name;
    storeRow.getElementById("city").textContent = curStores[index].city;
    storeRow.getElementById("Euro_sales").textContent = curStores[index].Euro_sales;
    storeRow.getElementById("storeDates").textContent = new Date(curStores[index].date).toLocaleDateString();
    storeBody.appendChild(storeRow);
  }
}

function saveStoreData()
{
  let curStores = JSON.parse(localStorage.getItem("storesArray")) || stores;

  
  let obj = {};
  obj["unit"] = document.getElementById("newStoreUnit").value;
  obj["store_name"] = document.getElementById("newStoreName").value;
  obj["city"] = document.getElementById("newStoreCity").value;
  obj["Euro_sales"] = parseInt(document.getElementById("newStoreSales").value,10);
  obj["date"] = new Date(document.getElementById("newStoreDate").value).toLocaleDateString();
  
  curStores.push(obj);
  
  localStorage.setItem("storesArray", JSON.stringify(curStores)); 

  
  displayData();
}
// main
var stores = [
  {unit:400, store_name:'Goertz', city:'Hamburg', Euro_sales:5000, date:"06/29/2019"},
  {unit:200, store_name:'Goertz', city:'Öjendorf', Euro_sales:2000, date:"06/29/2018"},
  {unit:300, store_name:'Goertz', city:'Hamburg', Euro_sales:3000, date:"06/29/2017"},
  {unit:400, store_name:'Goertz', city:'Frankfurt', Euro_sales:7000, date:"06/29/2016"},
  {unit:500, store_name:'Goertz', city:'Öjendorf', Euro_sales:8000, date:"06/29/2015"},
  {unit:600, store_name:'Goertz', city:'Frankfurt', Euro_sales:2300, date:"06/29/2014"},
  {unit:700, store_name:'Goertz', city:'Hamburg', Euro_sales:1500, date:"06/29/2013"},
  {unit:300, store_name:'Goertz', city:'Frankfurt', Euro_sales:6500, date:"06/29/2012"},
  {unit:900, store_name:'Goertz', city:'Öjendorf', Euro_sales:3300, date:"06/29/2011"},  
];

var filteredStores = stores;
document.getElementsByTagName("body").onload = function() {buildDropDown()};
buildDropDown();

  



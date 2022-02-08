var cityInput = document.getElementById("cityInput");
var cityName = document.getElementById("cityName");
var searchListEl = $('#searchlist')
cityName.innerHTML = cityInput.value

function getInput(city){  

  var city = cityInput.value
  

  fetch("https://api.openweathermap.org/data/2.5/forecast?q="+city+"&units=metric&appid=d27dfd72452eff29783d84394163f7b1")

  .then(response => response.json())
  .then(data => {
    for (i=0; i<6; i++){
    

       var day = document.getElementById("day"+(i+1))

       console.log(day)
       console.log(day.children[1])
       day.children[0].innerHTML = cityInput.value +" - "+ data.list[i].dt_txt;
       day.children[1].src ="http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon+".png";
       day.children[2].innerHTML = "Temp:"+ Number(data.list[i].main.temp)+"°";
       day.children[3].innerHTML = "Wind:"+ Number(data.list[i].wind.speed);
       day.children[4].innerHTML = "Humidity:"+ Number(data.list[i].main.humidity);

    }
    function savetostorage (city) {
      searchListEl.push(city);
      localStorage.setItem("searchlist", JSON.stringify(searchListEl));
    }
    savetostorage(city)
})
.catch(err => alert("Something went wrong"))
}
function historyButton (event){
  event.preventDefault();
  
    cityInput.value = event.target.textContent;
    var city = cityInput.value

    getInput(city);
  
}
function createButtons(){
      
  var button = document.createElement("button");
  button.textContent = cityInput.value;

  document.getElementById("searchlist").appendChild(button);
  

}
function init() {
  var storedhistory = JSON.parse(localStorage.getItem("searchlist"));
  
  if (storedhistory !== null) {
    history = storedhistory;
  }
 
  createButtons();
  
}
init();


document.getElementById("btn1").addEventListener("click",createButtons);
document.getElementById("searchlist").addEventListener("click",historyButton);





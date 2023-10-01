const userTab=document.querySelector("[data-userWeather]");
const searchTab=document.querySelector("[data-searchWeather]");
const userContainer=document.querySelector(".weather-container");


const grantAccessContainer=document.querySelector(".grant-loction-container");
const searchForm=document.querySelector("[data-searchForm]");

const loadigScreen=document.querySelector(".loading-container");
const userInfoContainer=document.querySelector(".user-info-container");


//initailly vairables need???
let oldTab=userTab;
const API_KEY="d1845658f92b31c64bd94f06f7188c9c";
oldTab.classList.add("current-tab");
getfromSessionStorage();

function switchTab(newTab){
    if(newTab != oldTab){
        oldTab.classList.remove("current-tab");
        oldTab=newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active")){
            //kya search form wala container is invisivel, if yes then make it visibel
            userContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }

        else{
            //main phle search wale pr tha ab your wethwer tab visibel hona chahiheya
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            //ab main your wether tab me aagya hu ,to wether bhi show krna pdega
            getfromSessionStorage();

        }
    }
   
 }

userTab.addEventListener("click",()=>{
    //pass clicked tab a input parameter
    switchTab(userTab);// functon niche hai
});

searchTab.addEventListener("click",()=>{
    //pass clicked tab a input parameter
    switchTab(searchTab);// functon niche hai
});

//check if cordinates are alreday present in session storge
function getfromSessionStorage(){
    const localCoordinates=sessionStorage.getItem("user-coordinates");
    if(!localCoordinates){
        //ager localcoordinates nhi mila to 
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates=JSON.para(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

async function fetchUserWeatherInfo(){
    const {lat, lon}=coordinates;
    //make grantcontainer invisible
    loadigScreen.classList.add("active");


    //API CALL
    try{
        const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city }&appid=${API_KEY}&units=metric`);
        const data =await response.json();

        loadigScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        randerWeatherInfo(data);

    }
    catch(err){
        loadigScreen.classList.remove("active");
    }
}

function randerWeatherInfo(weatherInfo){
    //firstly we have to featch the Element
    const cityName=document.querySelector("[data-cityName]");
    const countryIcon=document.querySelector("[data-countryIcon]");

    const desc=document.querySelector("[data-weatherDesc]");
    const weatherIcon=document.querySelector("[data-weatherIcon]");
    const temp=document.querySelector("[data-temp]");

    const windspeed=document.querySelector("[data-windsspeed]");

    const humidity=document.querySelector("[ data-humidity]");
    const cloudiness=document.querySelector("[data-cloudiness]");

    //featch value from weatherinfo object and it UI element
    cityName.innerHTML=weatherInfo?.name;
    countryIcon.src=`https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText=weatherInfo?.weather?.[0]?.description;
    weatherIcon.src=`https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText=`${weatherInfo?.main?.temp}°C`;
    windspeed.innerText=`${weatherInfo?.wind?.speed}m/s`;
    humidity.innerText=`${weatherInfo?.main?.humidity}%`;
    cloudiness.innerText=`${weatherInfo?.clouds?.all}%`;
}


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else{
        //hw show and alert for geolocation
    }
}


function showPosition(position){
    const userCoordinates={
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}

const grantAccessButton=document.querySelector("[ data-grantAccess]");
grantAccessButton.addEventListener("click",getLocation);

const searchInput=document.querySelector("[data-searchInput]");

searchForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let cityName=searchInput.value;
    if(cityName==="")
        return;
        else 
        fetchSearchWeatherInfo(cityName);
    
})

  async function fetchSearchWeatherInfo(city){
    loadigScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessButton.classList.remove("active");

    try{
        const response= await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city }&appid=${API_KEY}&units=metric`);

        const data=await response.json();
        loadigScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        randerWeatherInfo(data);

    }
    catch(err){

    }

}




 
const myweather=document.querySelector("[myweather]");
const findweather=document.querySelector("[findweather]");
const formsearch=document.querySelector("[formsearch]");
const weatherdetail=document.querySelector("[weatherdetail]");
const locationacess=document.querySelector("[locationacess]");
const inputbox=document.querySelector("[chara]");
const loading=document.querySelector("[loading]");
const windspeed=document.querySelector("[windspeed]");
const humidity=document.querySelector("[humidity]");
const clouds=document.querySelector("[clouds]");
const cityname=document.querySelector("[cityname]");
const description=document.querySelector("[description]");
const weatherimg=document.querySelector("[weatherimg]");
const temperature=document.querySelector("[temperature]");
const flag=document.querySelector("[flag]");
const API_KEY = "d1845658f92b31c64bd94f06f7188c9c";
const searchbtn=document.querySelector("[searchbtn]");
const grantbtn=document.querySelector("[grantbtn]");
const notfound=document.querySelector("[notfound]");

previoussessiondetail();
let currenttab=myweather;
currenttab.classList.add("bg");
let tab=""
function weathertab(){
    if(currenttab!=tab){
        currenttab.classList.remove("bg");
        tab.classList.add("bg");
        currenttab=tab;

        if(!formsearch.classList.contains("active")){
            weatherdetail.classList.remove("active");
            locationacess.classList.remove("active");
            formsearch.classList.add("active");
            
        }
        




        else{
            weatherdetail.classList.remove("active");
            formsearch.classList.remove("active");
            previoussessiondetail();
            
        }
    }
   
}



async  function searchbycity(city){
   
    loading.classList.add("active");
    let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const data= await response.json();
    console.log(data)
    loading.classList.remove("active");
    weatherdetail.classList.add("active");

   
    fillrequireddata(data);
}

function fillrequireddata(data){
    cityname.innerText=data?.name;
    flag.src=`https://flagcdn.com/144x108/${data?.sys?.country.toLowerCase()}.png`;
    description.innerText=data?.weather?.[0]?.description;
    weatherimg.src=`http://openweathermap.org/img/w/${data?.weather?.[0]?.icon}.png`;
    temperature.innerText=`${data?.main?.temp} °C`;
    windspeed.innerText=`${data?.wind?.speed} m/s`;
    humidity.innerText=`${data?.main?.humidity}%`;
    clouds.innerText=`${data?.clouds?.all}%`;

}
searchbtn.addEventListener('click',function(e){
    e.preventDefault();
    let city=inputbox.value;
    if(city==""){
        return;
    }
    else{
        searchbycity(city);
    }
        

});

function previoussessiondetail(){
let coordinartes=JSON.parse(sessionStorage.getItem("cordsval"));
if(!coordinartes){
    locationacess.classList.add("active");
}
else{
    locationbyvalue(coordinartes);
}
    


}
locationacess.addEventListener('click',askforlocation)


function askforlocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
      }
    }


function showPosition(value){
     let lat;
     let long;

    let coodsval={
         lat:value.coords.latitude,
        lon:value.coords.longitude,
    }
    locationacess.classList.remove("active");

    let cord=JSON.stringify(coodsval);
      locationbyvalue(coodsval);
    sessionStorage.setItem("cordsval", cord);
}
async function locationbyvalue(cord){
    locationacess.classList.remove("active");
   
    let lat=cord.lat;
    let lon=cord.lon;
    loading.classList.add("active");
    let valueresponse= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
    let data2= await valueresponse.json();
    loading.classList.remove("active");
    weatherdetail.classList.add("active");
    fillrequireddata(data2);

}




myweather.addEventListener('click',function(){
    tab=myweather;
   weathertab();
});
findweather.addEventListener('click',function(){
    tab=findweather;
    weathertab();
});

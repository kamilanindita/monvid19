$(document).ready(function(){

var _url="https://api.covid19api.com/summary"

function renderPage(data){
//get summary global and country

  //data summary global
  var dataResults ="<table>"
                  +"<tr>"
                  +"<td><strong>NewConfirmed</strong></td>"
                  +"<td><strong>: "+ data.Global.NewConfirmed +"</strong></td>"
                  +"</tr>"
                  +"<tr>"
                  +"<td><strong>TotalConfirmed</strong></td>"
                  +"<td><strong>: "+ data.Global.TotalConfirmed +"</strong></td>"
                  +"</tr>"
                  +"<tr>"
                  +"<td><strong>NewDeaths</strong></td>"
                  +"<td><strong>: "+ data.Global.NewDeaths +"</strong></td>"
                  +"</tr>"
                  +"<tr>"
                  +"<td><strong>TotalDeaths</strong></td>"
                  +"<td><strong>: "+ data.Global.TotalDeaths +"</strong></td>"
                  +"</tr>"
                  +"<tr>"
                  +"<td><strong>NewRecovered</strong></td>"
                  +"<td><strong>: "+ data.Global.NewRecovered +"</strong></td>"
                  +"</tr>"
                  +"<tr>"
                  +"<td><strong>TotalRecovered</strong></td>"
                  +"<td><strong>: "+ data.Global.TotalRecovered +"</strong></td>"
                  +"</tr>"
                  +"</table>";
  $('#globals').html(dataResults)
  //data country
  var dataCountryResults=''
  $.each(data.Countries, function(key, items){
  dataCountryResults +="<tr>"
                  +"<th>" + items.Country +"</th>"
                  +"<td>" + items.NewConfirmed +"</td>"
                  +"<td>" + items.TotalConfirmed +"</td>"
                  +"<td>" + items.NewDeaths +"</td>"
                  +"<td>" + items.TotalDeaths +"</td>"
                  +"<td>" + items.NewRecovered +"</td>"
                  +"<td>" + items.TotalRecovered +"</td>"
                  "</tr>";
  })
  $('#tabel_country').html(dataCountryResults)

  var dataAseanResults;
  $.each(data.Countries, function(key, items){
    if(items.CountryCode == 'BN' || items.CountryCode == 'ID' || items.CountryCode == 'KH' || items.CountryCode == 'LA' || items.CountryCode == 'MM' || items.CountryCode == 'MY' || items.CountryCode == 'PH' || items.CountryCode == 'SG' || items.CountryCode == 'TH' || items.CountryCode == 'TL' || items.CountryCode == 'VN'){
      dataAseanResults +="<tr>"
                    +"<th>" + items.Country +"</th>"
                    +"<td>" + items.NewConfirmed +"</td>"
                    +"<td>" + items.TotalConfirmed +"</td>"
                    +"<td>" + items.NewDeaths +"</td>"
                    +"<td>" + items.TotalDeaths +"</td>"
                    +"<td>" + items.NewRecovered +"</td>"
                    +"<td>" + items.TotalRecovered +"</td>"
                    "</tr>";
    }
  })

  $('#tabel_asean').html(dataAseanResults)

}

var networkDataRecieved=false

//fresh data from online
var networkUpdate =fetch(_url).then(function(response){
  return response.json()
}).then(function(data){
  networkDataRecieved=true
  renderPage(data)
})

//return data from caches
caches.match(_url).then(function(response){
  if(!response) throw Error('no data on cache')
  return response.json()
}).then(function(data){
  if(!networkDataRecieved){
    renderPage(data)
    console.log('render data from cache')
  }
}).catch(function(){
  return networkUpdate
})


//get summary indonesia
$.get("https://api.covid19api.com/total/dayone/country/indonesia", function(data){
  var dataResults=''

  $.each(data, function(key, items){
  dataResults ="<div>"
                  +"<table>"
                  +"<tr>"
                  +"<td><strong>Date</strong></td>"
                  +"<td><strong>: "+ items.Date + "</strong></td>"
                  +"</tr>"
                  +"<tr>"
                  +"<td><strong>Confirmed</strong></td>"
                  +"<td><strong>: "+ items.Confirmed + "</strong></td>"
                  +"</tr>"
                  +"<tr>"
                  +"<td><strong>Deaths</strong></td>"
                  +"<td><strong>: "+ items.Deaths + "</strong></td>"
                  +"</tr>"
                  +"<tr>"
                  +"<td><strong>Recovered</strong></td>"
                  +"<td><strong>: "+ items.Recovered + "</strong></td>"
                  +"</tr>"
                  +"</table>"
                  "</div>";
  })
  $('#indonesia').html(dataResults)
})


//get data indonesia (timeline dan paling tinggi)
$.get("https://api.covid19api.com/total/dayone/country/indonesia", function(data){
  //data timeline indonesia
  var dataResults=''
  var arr=[]
  //paling Tertinggi
  var positif=[]
  var meninggal=[]
  var sembuh=[]
  var a=0
  var b=0
  var c=0
  var hari=[]

  $.each(data, function(key, items){
  dataResults ="<div class='timeline'>"
                  +"<span class='timeline-icon'></span>"
                  +"<span class='year'>" + items.Date + "</span>"
                  +"<div class='timeline-content'>"
                  +"<p class='description'>"
                  +"Confirmed   : " + items.Confirmed +"<br>"
                  +"Deaths      : " + items.Deaths +"<br>"
                  +"Recovered   : " + items.Recovered +"</p>"
                  "</div></div>";
  arr.push(dataResults)
  positif.push(items.Confirmed-a)
  a=items.Confirmed
  meninggal.push(items.Deaths-b)
  b=items.Deaths
  sembuh.push(items.Recovered-c)
  c=items.Recovered
  hari.push(items.Date)
  })
  arr.reverse()
  $('#timeline').html(arr)


  var positifMax=Math.max(...positif)
  var indexPos = positif.indexOf(positifMax);

  var meninggalMax=Math.max(...meninggal)
  var indexMen = meninggal.indexOf(meninggalMax);

  var sembuhMax=Math.max(...sembuh)
  var indexSem = sembuh.indexOf(sembuhMax);

  var postPositif ="<div class='text-center'>"
                  +"<p><strong>"
                  + hari[indexPos] +"<br>"
                  + "<h2>"+ positifMax +"</h2> "
                  + "</strong></p>"
                  "</div>";

  var postMeninggal ="<div class='text-center'>"
                  +"<p><strong>"
                  + hari[indexMen] +"<br>"
                  + "<h2>"+ meninggalMax +"</h2> "
                  + "</strong></p>"
                  "</div>";

  var postSembuh ="<div class='text-center'>"
                  +"<p><strong>"
                  + hari[indexSem] +"<br>"
                  + "<h2>"+ sembuhMax +"</h2> "
                  + "</strong></p>"
                  "</div>";

  $('#confirmed').html(postPositif)
  $('#meninggal').html(postMeninggal)
  $('#sembuh').html(postSembuh)

})





})


//pwa
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/serviceworker.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

var dataPos=[]

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

//summary indonesia
$.get("https://services5.arcgis.com/VS6HdKS0VfIhv8Ct/arcgis/rest/services/Statistik_Perkembangan_COVID19_Indonesia/FeatureServer/0/query?where=1%3D1&objectIds=&time=&resultType=none&outFields=*&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&sqlFormat=none&f=pjson&token=", function(data){
  var obj = JSON.parse(data);

  $.each(obj.features, function(key, items){
    if (items.attributes.Jumlah_Kasus_Kumulatif !=null) {
      var ts = new Date(items.attributes.Tanggal);
      dataResults ="<div>"
                        +"<table>"
                        +"<tr>"
                        +"<td><strong>Date</strong></td>"
                        +"<td><strong>: "+ ts.toDateString() + "</strong></td>"
                        +"</tr>"
                        +"<tr>"
                        +"<td><strong>Confirmed</strong></td>"
                        +"<td><strong>: "+ items.attributes.Jumlah_Kasus_Kumulatif + "</strong></td>"
                        +"</tr>"
                        +"<tr>"
                        +"<td><strong>Deaths</strong></td>"
                        +"<td><strong>: "+ items.attributes.Jumlah_Pasien_Meninggal + "</strong></td>"
                        +"</tr>"
                        +"<tr>"
                        +"<td><strong>Recovered</strong></td>"
                        +"<td><strong>: "+ items.attributes.Jumlah_Pasien_Sembuh + "</strong></td>"
                        +"</tr>"
                        +"<tr>"
                        +"<td><strong>Deaths</strong></td>"
                        +"<td><strong>: "+ items.attributes.Persentase_Pasien_Meninggal + "%</strong></td>"
                        +"</tr>"
                        +"<tr>"
                        +"<td><strong>Recovered</strong></td>"
                        +"<td><strong>: "+ items.attributes.Persentase_Pasien_Sembuh + "%</strong></td>"
                        +"</tr>"
                        +"</table>"
                        "</div>";
    }
  })
  $('#indonesia').html(dataResults)
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

$(document).ready(function(){

//timeline
$.get("https://kawalcorona.com/indonesia/", function(data){
  console.log(data);
  //data timeline indonesia
  //var dataResults=''
  //var arr=[]

  // $.each(data, function(key, items){
  //   console.log(items.attributes);
  // // dataResults ="<div class='timeline'>"
  // //                 +"<span class='timeline-icon'></span>"
  // //                 +"<span class='year'>" + items.Date + "</span>"
  // //                 +"<div class='timeline-content'>"
  // //                 +"<p class='description'>"
  // //                 +"Confirmed   : " + items.Confirmed +"<br>"
  // //                 +"Deaths      : " + items.Deaths +"<br>"
  // //                 +"Recovered   : " + items.Recovered +"</p>"
  // //                 "</div></div>";
  // // arr.push(dataResults)
  // })

  //$('#coba').html(arr)
})

})

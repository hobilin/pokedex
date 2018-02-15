$(document).ready(function() {

});

function success(data){
  let results = data.results;
  for(var x in results){
    let pokeUrl = results[x].url;
    $.ajax({
      url: pokeUrl,
      type: 'GET',
      success: function(data){
          $('#pokemon').append('<img data-toggle="modal" data-target="#myModal" class="thisPoke" db-id="' + data.id + '" src="' + data.sprites.front_shiny + '" alt="">')
         $('.thisPoke').click(function(){
            let idPoke = $(this).attr("db-id");
          $.get("https://pokeapi.co/api/v2/pokemon/" + idPoke + "/",(data, status)=>{
            if(status === "success"){
              console.log(data);
               $(".modal-content").empty();
              $(".modal-content").append("<img db-id='" + data.id + "'' src='" + $(this).attr("src") + "' alt=''><h2>" + data.name + "</h2><p id='description'></p>");
              return;
            }else{
              console.log(status);
            }
            });
                        $.get("https://pokeapi.co/api/v2/pokemon-species/" + idPoke + "/",(data, status)=>{
                if(status === "success"){
                  let flavorText = data.flavor_text_entries;
                  for(var y in flavorText){
                    if(flavorText[y].language.name === "en"){
                      $("#description").append(flavorText[y].flavor_text);
                    }
                  }return;
                } else {
                  console.log(status);
                }
              });
  });
          }


      });
  };
             
};


$.ajax({
  url : 'http://pokeapi.salestock.net/api/v2/pokemon/?limit=949',
  type: 'GET',
  success: success
});


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
          $.get("https://pokeapi.co/api/v2/pokemon/" + idPoke + "/",(dataPoke, status)=>{
            if(status === "success"){
              console.log(data);
               $(".modal-content").empty();
              $(".modal-content").append("<img db-id='" + dataPoke.id + "'' src='" + $(this).attr("src") + "' alt=''><h2>" + dataPoke.name + "</h2><p id='description'></p>");
                                      $.get("https://pokeapi.co/api/v2/pokemon-species/" + idPoke + "/",(dataDes, status)=>{
                if(status === "success"){
                  let flavorText = dataDes.flavor_text_entries;
                  for(var y in flavorText){
                    if(flavorText[y].language.name === "en" && flavorText[y].version.name === "x" ){
                      console.log(flavorText[y].flavor_text);
                      $("#description").append(flavorText[y].flavor_text);
                    }
                  }return;
                } else {
                  console.log(status);
                }
              });
              return;
            }else{
              console.log(status);
            }
            });

  });
          }


      });
  };
             
};


$.ajax({
  url : 'http://pokeapi.salestock.net/api/v2/pokemon/?limit=10', //942
  type: 'GET',
  success: success
});


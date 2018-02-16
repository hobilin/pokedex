
function success(data){
  let results = data.results;
  results.forEach(el =>{
    let pokeUrl = el.url;
    $.ajax({
      url: pokeUrl,
      type: 'GET',
      success: function(data){
          $('#pokemon').append('<img data-toggle="modal" data-target="#myModal" id="' + data.id + '" class="thisPoke" db-id="' + data.name + '" src="' + data.sprites.front_shiny + '" alt="">')
              $('#pokeSearch').keyup(function() {
      var findPoke = $(this).val();
      $('.thisPoke').hide();

      $('.thisPoke').each(function() {
        var search = $(this).attr('db-id');
        if (search.indexOf(findPoke) != -1) {
          $(this).show();
        }
      });
    });
         $('.thisPoke').click(function(event){
          event.stopImmediatePropagation();
          $('#myModal').modal('show');
          $(".modal-content").empty();
            let idPoke = $(this).attr("db-id");
            let realId = $(this).attr("id");
async function fetchURLs() {
    try {
      // Promise.all() lets us coalesce multiple promises into a single super-promise
      var dataBothUrl = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${realId}`).then((response) => response.json()),// parse each response as json
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${realId}`).then((response) => response.json())
      ]);
      $(".modal-content").append("<img db-id='" + dataBothUrl[0].id + "'' src='" + dataBothUrl[0].sprites.front_shiny + "' alt=''><h2>" + dataBothUrl[0].name + "</h2><p id='description'></p><p>Height: " + dataBothUrl[0].height + "</p><p>Weight: " + dataBothUrl[0].weight + "</p><ul id='abilities'>Abilities:</ul><ul id='types'>Types:</ul><p>Habitat: " + dataBothUrl[1].habitat.name + "</p><p>Evolves from: " + dataBothUrl[1].evolves_from_species.name + "</p><p>Generation: " + dataBothUrl[1].generation.name + "</p>");
      let abilities = dataBothUrl[0].abilities;
      abilities.forEach(el =>{
        $('#abilities').append('<li>' + el.ability.name + '</li>');
      });

      let types = dataBothUrl[0].types;
      types.forEach(el =>{
        $('#types').append('<li>' + el.type.name + '</li>');
      });

      let flavorText = dataBothUrl[1].flavor_text_entries;
      flavorText.forEach(el =>{
        if(el.language.name === "en" && el.version.name === "x" ){
          $("#description").append(el.flavor_text);
        }
      });
    } catch (error) {
      console.log(error);
    }
  } fetchURLs();
});
       }


      });
  });
             
};


$.ajax({
  url : 'http://pokeapi.salestock.net/api/v2/pokemon/?limit=942', //942
  type: 'GET',
  success: success
});


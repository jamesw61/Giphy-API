$( document ).ready(function() {
  animalArray = [];
  var searchTerm = "";
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=";
  var apiKey = "&api_key=dc6zaTOxFJmzC&limit=10";
  var buttonTitle = "";

  function createAnimalButton() 
  {
    var newButton = $("<button>");
    newButton.text(searchTerm)
             .attr("title", searchTerm)
             .addClass('addedButton');
    $('#animalButtons').append(newButton); 
  }

  function makeAjaxRequest()
  {
    var newQueryURL =  queryURL + buttonTitle + apiKey;
    $.ajax({
            url: newQueryURL,
            method: "GET"
            }).done(function(response) 
              {
                for (var j = 0; j <10; j++)
                  {
                  console.log(response);
                  var gifContainer = $('<div>')  
                  var newDiv = $('<img>');
                  gifContainer.html('<h3 class="text-center">Rating:  ' + response.data[j].rating + "</h3>")
                              .addClass('gifContain');
                  var newURL = response.data[j].images.fixed_height_still.url;
                  newDiv.attr("src", newURL).attr("URLanimate", response.data[j].images.fixed_height.url)
                        .attr("URLstill", newURL)
                        .addClass("gif");
                  gifContainer.prepend(newDiv);
                  $('#animals').prepend(gifContainer);
                  }
              });
  }

  $('#submitButton').on('click', function(){
    searchTerm = $('#animal-input').val().trim();
    animalArray.push(searchTerm);
    createAnimalButton();
  });

  $("#animal-input").keyup(function(event){
      if(event.keyCode == 13){
          $("#submitButton").click();
          $('#animal-input').val("");
      }
  });

  $("#animalButtons").on("click",'.addedButton', function() { 
    $('#animals').empty(); 
    buttonTitle = $(this).text();
    makeAjaxRequest();   
  });

  $('#animals').on('click', '.gif', function(){

    var currentURL = $(this).attr("src");
    var stillURL = $(this).attr("URLstill");
    var animateURL = $(this).attr("URLanimate");
    if (currentURL === stillURL){  
      $(this).attr("src", animateURL); 
    }
    else {
      $(this).attr("src", stillURL);  
    }    
  });
});
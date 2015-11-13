var count = 0;

var titleLength;
var resultsArrayMovies;


function initialize() {
    sendRequest();

}



function accessArray(arrayIds){
    var output1 = document.getElementById("output1");
    console.log("ddd")
    output1.innerHTML+="<ul id = 'titles'>";
    var obj = 0;
    var date;
    var state = 1;
    var unique;
    for(obj = 0; obj < resultsArrayMovies.length; obj++){
            unique = resultsArrayMovies[obj].id;
            date = resultsArrayMovies[obj].release_date;
            arrayIds.push(resultsArrayMovies[obj].id);
            output1.innerHTML+= "<li><u><h4><a  href='#'  onclick=myFunction("+resultsArrayMovies[obj].id+");>" + resultsArrayMovies[obj].title + "</a></u>&nbsp;&nbsp;"+ date+"</h4></li>";

    } 
    output1.innerHTML+="</ul>";
    }


function sendRequest() {
      var arrayIds;
      var xhr = new XMLHttpRequest();
      var query = encodeURI(document.getElementById("form-input").value);
      xhr.open("GET", "proxy.php?method=/3/search/movie&query=" + query);
      //document.getElementById("genre").innerHTML = "";
     // document.getElementById("releaseDate").innerHTML="";
     // document.getElementById("credits").innerHTML = "";
      document.getElementById("poster").innerHTML = "";
      //document.getElementById("overview").innerHTML = "";
      xhr.setRequestHeader("Accept","application/json");
      xhr.onreadystatechange = function () {
      if (this.readyState == 4) {
           var json = JSON.parse(this.responseText);
           document.getElementById("output1").innerHTML = "";
           var str = JSON.stringify(json,undefined,2);
           resultsArrayMovies = json.results;
           arrayIds = new Array(resultsArrayMovies.length);
           accessArray(arrayIds);
           //document.getElementById("output").innerHTML = "<pre>" + str+ "</pre>";
           //document.getElementById("output1").innerHTML=  "<pre>" + json.results.length + "</pre>";
       }
   };

   xhr.send(null);
}



function showPoster(imagePath){

    console.log(imagePath);
    var posterDiv = document.getElementById("poster");
    posterDiv.innerHTML += "<p><h2><u>Poster:</u></h2><p>"
    posterDiv.innerHTML += "<img src=http://image.tmdb.org/t/p/w500"+imagePath+" height="+300+" width="+300+">";


} 

function showTitle(orgTitle){
    var titleDiv= document.getElementById("poster");
    titleDiv.innerHTML += "<h2><u>Title:</u></h2>"+"<h5>"+orgTitle+"</h5>";

}



function showOverView(summary){
    document.getElementById("poster").innerHTML+="<h2><u>Summary:</u></h2><p>" +summary+"</p>"   
 }

function showReleasedDate(releaseDate){
    document.getElementById("releaseDate").innerHTML+="<p>" +releaseDate+"</p>"  

}

function showGenres(genreIds){

    var genreDiv = document.getElementById("poster");
    genreDiv.innerHTML+= "<h2><u>Genre:</u></h2>";
    genreDiv.innerHTML += "<h5>";
    for(var i = 0; i < genreIds.length; i++ ){
        if((genreIds.length -i) == 1){
            genreDiv.innerHTML += genreIds[i].name+".";
        } else {
            genreDiv.innerHTML += genreIds[i].name+",&nbsp;";
        }
                
    }
    genreDiv.innerHTML+="</h5>";

}

function showCredits(creditsCast){
    var creditsDiv = document.getElementById("poster");
    creditsDiv.innerHTML +="<h2><u>Credits:</u></h2><h5>";
   // for(var i = 0; i < 5; i++ ){ 
     //   creditsDiv.innerHTML += "<li><h5>"+ creditsCast[i].name+"</h5></li>";

    //}
    
     for(var i = 0; i < creditsCast.length; i++ ){
        if(i==5){
            //creditsDiv.innerHTML += ".";
             break;
        }
           
        if(creditsCast[i+1]){
            if((5-i)==1){
                creditsDiv.innerHTML += creditsCast[i].name+".";
            } else {
                 creditsDiv.innerHTML += creditsCast[i].name+",&nbsp;";
            }
           
           
        } if (!(creditsCast[i+1])) {
             //creditsDiv.innerHTML += creditsCast[i].name+".";
            break;
           // creditsDiv.innerHTML += creditsCast[i].name+",&nbsp;";
        }
                
    }
    creditsDiv.innerHTML+="</h5>";

}

function processCredits(id){
    var request = new XMLHttpRequest();
    request.open('GET', 'proxy.php?method=/3/movie/'+id+'/credits');
    request.setRequestHeader('Accept', 'application/json');
    var creditsCast;
    //document.getElementById("ce").innerHTML="";
    request.onreadystatechange = function () {
        if (this.readyState == 4) {
            var json = JSON.parse(this.responseText);
            var str = JSON.stringify(json,undefined,2);
             //document.getElementById("credits").innerHTML = "<pre>" + str+ "</pre>";
            creditsCast = json.cast;
            showCredits(creditsCast);
           // document.getElementById("output1").innerHTML = "<pre>" + str+ "</pre>";

        }
    };
    request.send();
}

function myFunction(id){

    //document.getElementById("genre").innerHTML = "";
   // document.getElementById("credits").innerHTML = "";
    document.getElementById("poster").innerHTML = "";
    //document.getElementById("overview").innerHTML = "";
    document.getElementById("releaseDate").innerHTML="";
     //document.getElementById("title").innerHTML = "";

    var genreIds;
    var overView;
    var posterSource;
    var releaseDate;
    var arrayGenres;
    var title;

    var request = new XMLHttpRequest();
    request.open('GET', 'proxy.php?method=/3/movie/'+id);
    request.setRequestHeader('Accept', 'application/json');
    var genres = document.getElementById("genre");
    request.onreadystatechange = function () {
    if (this.readyState === 4) {
      var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);

          genreIds = json.genres;
          overView = json.overview;
          posterSource = json.poster_path;
          releaseDate = json.release_date;
          title = json.title;


          showPoster(posterSource);
          showTitle(title)
          showOverView(overView);
          showGenres(genreIds);
          processCredits(id);
      }

    };

    request.send();

}


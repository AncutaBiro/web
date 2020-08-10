window.Movie = {

    API_URL: "http://localhost:8082",

    getMovies: function () {
        $.ajax({
            method: "GET",
            url: Movie.API_URL + "/movies"
        }).done(function (response) {
            console.log(response);
            Movie.displayMovies(response.content);
        })
    },

    getMovieHtml: function (movie) {
        return `
        
<div class="col-md-2 w3l-movie-gride-agile">
<a href="single.html" class="hvr-shutter-out-horizontal"><img src="images/m7.jpg" title="album-name" alt=" " />
<div class="w3l-action-icon"><i class="fa fa-play-circle" aria-hidden="true"></i></div>
</a>
<div class="mid-1">
<div class="w3l-movie-text">
<h6><a href="single.html">${movie.title}</a></h6>
</div>
<div class="mid-2">
<p>Movie rate &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </p>
<p>${movie.rate}</p>

<!--<div class="block-stars">-->
<!--<ul class="w3l-ratings">-->
<!--<li><a href="#"><i class="fa fa-star" aria-hidden="true"></i></a></li>-->
<!--<li><a href="#"><i class="fa fa-star" aria-hidden="true"></i></a></li>-->
<!--<li><a href="#"><i class="fa fa-star" aria-hidden="true"></i></a></li>-->
<!--<li><a href="#"><i class="fa fa-star-half-o" aria-hidden="true"></i></a></li>-->
<!--<li><a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a></li>-->
<!--</ul>-->
<!--</div>-->

<div class="clearfix"></div>
</div>
</div>
<div class="ribben two">
<p>NEW</p>
</div>
</div>
        `
    },

    displayMovies: function (movies) {
        let moviesHtml = '';

        movies.forEach(movie => moviesHtml += Movie.getMovieHtml(movie));

        $('.browse-inner').html(moviesHtml);
        $('.browse-inner-come-agile-w3').html(moviesHtml);
    // <div class="browse-inner">
    },

};

Movie.getMovies();
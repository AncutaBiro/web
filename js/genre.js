window.Category = {

    API_URL: "http://localhost:8082",

    getMoviesByCategory: function () {

        const params = new URLSearchParams(window.location.search);
        const genre = params.get('category');

        $.ajax({
            method: "GET",
            url: Category.API_URL + "/categories/" + genre
        }).done(function (response) {
            console.log(response);
            Category.displayMoviesFromCategory(response.movies);
        })
    },

    getMoviesinCategoryHtml: function (movie) {
        return `
    <div class="col-md-2 w3l-movie-gride-agile">
    <a href="#" class="hvr-shutter-out-horizontal"><img src= "${Category.API_URL}/images/${movie.poster}" alt="" />
    <div class="w3l-action-icon"><i class="fa fa-play-circle" aria-hidden="true"></i></div>
    </a>
    <div class="mid-1">
    <div class="w3l-movie-text">
    <h6><a href="#">${movie.title}</a></h6>
    </div>
    <div class="mid-2">
    <p>${movie.categories.join(", ")}</p>
    <br>
    <p>Rate:  ${movie.rate}</p>
    
    <div class="clearfix"></div>
    </div>
    </div>
    </div>
        `
    },

    displayMoviesFromCategory: function (movies) {
        let moviesHtml = '';

        movies.forEach(movie => moviesHtml += Category.getMoviesinCategoryHtml(movie));

        $('.browse-inner').html(moviesHtml);
        $('.browse-inner-come-agile-w3').html(moviesHtml);
    },

};

Category.getMoviesByCategory();
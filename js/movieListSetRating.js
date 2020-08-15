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

    getMoviesByRate: function () {
        $.ajax({
            method: "GET",
            url: Movie.API_URL + "/movies/byRate"
        }).done(function (response) {
            console.log(response);
            Movie.displayMovies(response.content);
        })
    },

    getMovieHtml: function (movie) {
        return `
				<tr>
				
				<td class="w3-list-img"><a href="#"> <img src= "${Movie.API_URL}/images/${movie.poster}" alt="" /> 
				      <span> ${movie.title}</span></a>
				</td>
				<td> ${movie.description}</td>
				<td class="w3-list-info"><a href="#"> ${movie.categories.join(" ")}</a></td>
			
											<td>
											<input id=${movie.id + '_input'} type="number" step=0.1 min=0 max=10 id="rate-field" placeholder="0-10"> 
											    <a class="edit" data-rate=${movie.rate} data-id=${movie.id}>
                                                    <input type="submit" value="Save">
                                                </a>
											</td>							
                                            <td><h4>${movie.rate}</h4></td>                     
				</tr>
        `
    },

    displayMovies: function (movies) {
        let moviesHtml = '';
        movies.forEach(movie => moviesHtml += Movie.getMovieHtml(movie));
        $('#main-page-table').html(moviesHtml);

    },

    setRateInMovie: function (id, rateValue) {
        let requestBody = {
            rate: rateValue
        };
        $.ajax({
            url: Movie.API_URL + "/movies/" + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(requestBody)
        }).done(function () {
            Movie.getMoviesByRate();
        });
    },

    bindEvents: function () {
        $('#main-page-table').delegate('.edit', 'click', function (event) {
            event.preventDefault();

            let id = $(this).data('id');
            let rate = $('#' + id + '_input').val();

            Movie.setRateInMovie(id, rate);
        });
    },

}

Movie.getMoviesByRate();
Movie.bindEvents();
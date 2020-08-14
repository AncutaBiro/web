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
										  <tr>
											<td> ${movie.id}</td>
											<td class="w3-list-img"><a href="#"> <img src= "${Movie.API_URL}/images/${movie.poster}" alt="" /> 
											<span> ${movie.title}</span></a>
											</td>
											<td> ${movie.description}</td>
											<td class="w3-list-info"><a href="#">${movie.categories.join(" ")}</a></td>
			
											<td>${movie.rate}
											<input id=${movie.id + '_input'} type="number" step=0.1 min=0 max=10 id="rate-field" placeholder="0-10"> </td>
										
                                            <td> 
                                                <a class="edit" data-rate=${movie.rate} data-id=${movie.id}>
                                                    <input type="submit" value="Save">
                                                </a> 
                                            </td>
										  </tr>
        `
    },

    displayMovies: function (movies) {
        let moviesHtml = '';
        movies.forEach(movie => moviesHtml += Movie.getMovieHtml(movie));
        $('#main-page-table').html(moviesHtml);

    },

    setRateInMovie: function (id, movie, rateValue) {
        let titleValue =  movie.title;
        let descriptionValue = movie.description;
        let posterValue = movie.poster;

        let requestBody = {
            title: titleValue,
            description: descriptionValue,
            poster: posterValue,
            rate: rateValue
        };
        $.ajax({
            url: Movie.API_URL + "/movies" + '?id=' + id,
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(requestBody)
        }).done(function () {
            Movie.getMovies();
        });
    },

    bindEvents: function () {
        $('#main-page-table').delegate('.edit', 'click', function (event) {
            event.preventDefault();

            let id = $(this).data('id');
            let rate = $('#' + id + '_input').val();

            const movie= {
                title: "test",
                description: "test",
                poster: "t",
            }

            console.log('#' + id + '_input')
            Movie.setRateInMovie(id, movie, rate);
        });


    },

}

Movie.getMovies();
Movie.bindEvents();
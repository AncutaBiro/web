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
									<table id="table-breakpoint">
										<thead>
										  <tr>
											<th>No.</th>
											<th>Movie Name</th>
											<th>Logline</th>
											<th>Genre</th>
											<th>Rating</th>
											<th></th>				
										  </tr>
										</thead>
										
										<tbody>
										  <tr>
											<td> ${movie.id}</td>
											<td class="w3-list-img"><a href="#"> <img src= "${Movie.API_URL}/images/${movie.poster}" alt="" /> 
											<span> ${movie.title}</span></a>
											</td>
											<td> ${movie.description}</td>
											<td class="w3-list-info"><a href="#">${movie.categories.join(" ")}</a></td>
			
											<td>${movie.rate}
											<input type="number" step=0.1 min=0 max=10 id="rate-field" placeholder="0-10"> </td>
										
                                            <td> 
                                            <a class="edit" data-id=${movie.rate}>
                                            <input type="submit" value="Save"> </td>
											
										  </tr>
										  </tbody>
										  </table>
        `
    },

    displayMovies: function (movies) {
        let moviesHtml = '';
        movies.forEach(movie => moviesHtml += Movie.getMovieHtml(movie));
        $('#table-breakpoint').html(moviesHtml);

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
        $('#table-breakpoint').delegate('.edit', 'click', function (event) {
            event.preventDefault();

            let id = $(this).data('id');

            Movie.setRateInMovie(id, movie, 8);
        });


    },

}

Movie.getMovies();
Movie.bindEvents();
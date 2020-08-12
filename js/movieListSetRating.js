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
                                    </div>
									<table id="table-breakpoint">
										<thead>
										  <tr>
											<th>No.</th>
											<th>Movie Name</th>
											<th>Logline</th>
											<th>Genre</th>
											<th>Rating</th>
										  </tr>
										</thead>
										<tbody>
										  <tr>
											<td>${movie.id}</td>
											<td class="w3-list-img"><a href="#"> <img src="${Movie.API_URL}/images/${movie.poster}" alt="" /> <span>${movie.title}</span></a></td>
											<td>${movie.description}</td>
											<td class="w3-list-info"><a href="#">${movie.categories.join(" ")}</a></td>
											<td>${movie.rate}</td>
										  </tr>
        `
    },

    displayMovies: function (movies) {
        let moviesHtml = '';

        movies.forEach(movie => moviesHtml += Movie.getMovieHtml(movie));

        $('#table-breakpoint').html(moviesHtml);

    },

};

Movie.getMovies();
'use strict';

document.addEventListener('DOMContentLoaded', function (event){
    const searchmovie = document.getElementById('searchMovie');

    searchmovie.addEventListener('submit', function (event){
        event.preventDefault();
        const Title = this.querySelector('input').value;
        movieLookup(Title);
    })
})

function movieLookup(Title) {
    fetch (`http://www.omdbapi.com/?t=${Title}&apikey=e4444310`)
    .then(function(response){
        return response.json()
    })
    .then(function(data){
        console.log(data);
        showMovie(data);
    })
    .catch(function (error){
        console.error('ERROR!! THINGS ARE BROKEN!', error);
    })
};

function showMovie(movie) {
    const movieName = document.getElementById('movieTitle');
    movieName.innerText = movie.Title;
    
    const movieRate = document.getElementById('movieRated');
    movieRate.innerText = movie.Rated;

    const moviePoster = document.getElementById('movieImg');
    moviePoster.src = movie.Poster;
    moviePoster.alt = movie.Title;
    
    const moviesDisplay = document.querySelector('#movie');
    moviesDisplay.appendChild(moviePoster);
    moviesDisplay.appendChild(movieName);
    moviesDisplay.appendChild(movieRate);
    
    movie.Ratings.map(function (rating) {
        const movieRating = document.getElementById('Ratings');
        movieRating.innerText = `${rating.Source}: ${rating.Value}`;
        moviesDisplay.appendChild(movieRating);
    });

}
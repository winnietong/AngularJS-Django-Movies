var app = angular.module('myApp', ['ngRoute', 'ngResource']);

// Declare app level module which depends on filters, and services
app.config(function($routeProvider) {
	$routeProvider
    .when('/', {
		templateUrl: '/static/js/partials/home.html',
		controller: 'homeController'
	})
	.when('/coming-soon', {
		templateUrl: '/static/js/partials/coming-soon.html',
		controller: 'comingsoonController'})
	.when('/search', {
		templateUrl: '/static/js/partials/search.html',
		controller: 'searchController'})
	.when('/profile', {
		templateUrl: '/static/js/partials/profile.html',
		controller: 'profileController'})
	.when('/movie/:movieId', {
		templateUrl: '/static/js/partials/movieId.html',
		controller: 'movieIdController'})
	.otherwise({redirectTo: '/'});
});


// Adds and returns a list of purchased movies
app.factory('UserMovies', function() {
    var mymovies = [];
    return {
        returnMovies: mymovies,
        addMovie: function(title, showtime){
            title['showtime'] = showtime;
            mymovies.push(title);
        }
    };
});

// Adds and returns a list of favorite movies
app.factory('UserFavorites', function($http) {
    var myfavorites = [];
    return {
        returnFavorites: myfavorites,
        addFavorite: function(movie){
            $http.post('/add_favorite/', {
                title: movie.title,
                poster: movie.poster,
                movieID: movie.movieID
            }).success(function(response) {
                console.log(response);
            }).error(function(response) {
                console.log(response);
            });
//            myfavorites.push(title);
        }
    };
});

app.factory('Theater', function($resource) {
    return{
        fetchMovies: function(url, page_limit, callback){
            var api = $resource(url + "apikey=:key&callback=:callback",
            {
                key: "88a8qpv9kwg657jxb97ma5nn",
                callback: "JSON_CALLBACK",
                limit: page_limit
            },
            {
                fetch:{method:'JSONP'}
            });
            api.fetch(function(response){
                var titles = [];
                for (var i = 0; i < response.movies.length; i++) {
                    movie =response.movies[i];
                    titles.push({
                        title: movie.title,
                        poster: movie.posters.thumbnail,
                        runtime: movie.runtime,
                        audience_score: movie.ratings.audience_score,
                        critics_score: movie.ratings.critics_score,
                        synopsis: movie.synopsis,
                        movieID: movie.id
                    });
                }
                callback(titles);
            });
        },
        fetchMovie: function(url, callback){
            var api = $resource(url + ".json?apikey=:key&callback=JSON_CALLBACK", {
                key: "88a8qpv9kwg657jxb97ma5nn",
            }, {
                fetch:{method:'JSONP'}
            });

            api.fetch(function(response) {
                var titles = [];
                titles.push({
                    title: response.title,
                    poster: response.posters.thumbnail,
                    runtime: response.runtime,
                    audience_score: response.ratings.audience_score,
                    critics_score: response.ratings.critics_score,
                    synopsis: response.synopsis,
                    movieID: response.id,
                    cast: response.abridged_cast
                });
                callback(titles);
            });
        }
    }
});


app.controller('homeController', function($scope, $http, Theater) {
    var url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json?';
    var page_limit = 10;

    Theater.fetchMovies(url, page_limit, function(data){
        $scope.titles = data;
    });

});


app.controller('movieIdController', function($scope, $http, $routeParams, UserMovies, Theater) {
    var movieId = $routeParams.movieId;
    var url = 'http://api.rottentomatoes.com/api/public/v1.0/movies/' + movieId;

    Theater.fetchMovie(url, function(data){
        $scope.titles = data;
    });

    $scope.add_movie = function(title, showtime){
        // add movieID to a list of user's movies
        UserMovies.addMovie(title, showtime);
        alert("you've just purchased a ticket!");
    };
});

app.controller('comingsoonController', function($scope, $http, UserFavorites, Theater) {

    var url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json?',
    page_limit = 10;

    Theater.fetchMovies(url, page_limit, function(data){
        $scope.titles = data;
    });
    
    $scope.add_favorite = function(movie){
        // add movieID to a list of user's movies
        UserFavorites.addFavorite(movie);
        alert("added to favorites!");
    };
});


app.controller('searchController', function($scope, $http, Theater) {
    $scope.getMovies = function(){
        var page_limit = 10;
        var query = $scope.query;
        var url = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=' + query + '&';

        Theater.fetchMovies(url, page_limit, function(data){
            $scope.titles = data;
        });
    };

    $scope.toggleShow = function(index){
        $scope.titles[index].showDesc = $scope.titles[index].showDesc === false ? true: false;
    };
});


app.controller('profileController', function($scope, UserMovies, UserFavorites) {
    $scope.userMovies = UserMovies.returnMovies;
    $scope.userFavorites = UserFavorites.returnFavorites;
});



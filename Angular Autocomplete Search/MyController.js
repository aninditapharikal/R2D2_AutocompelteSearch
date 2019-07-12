var app = angular.module('AutocompleteModule', ['ui.bootstrap']);

app.factory('MyFactory',function($http){
    return {
        fetchAllMovies: function () {
            return $http({
                method: 'JSONP',
                url: 'https://www.themoviedb.org/movies'
            })
        },
        fetchDetail:function (id) {
            return $http({
                method: 'JSONP',
                url: 'https://www.themoviedb.org/movies/ID='+id
            })
        }
    }

})
    
app.controller('MyController',function ($scope,MyFactory) {
    $scope.selected = '';
    $scope.movieDetail=null;
//fetch all movie names when controller loads
    MyFactory.fetchAllMovies()
        .then(function (data) {
            $scope.movies=data;
            },
            function (err) {
                console.log(err);
            })
//assigned data manually as fetchAllMovies server call is getting no data. data is undefined
    $scope.movies=['Spider-Man',
        'Alita',
        'John Wick',
        'Toy Story 4',
        'Hellboy',
        'Shazam!',
        'The Lion King']

    $scope.onSelect = function ($item, $model, $label) {

        //fetch data for the item selected
        if($item)
            fetchDetails($item);

    };

    var fetchDetails=function(selectedItem){
        MyFactory.fetchDetail(selectedItem)
            .then(function (data) {
                    $scope.movieDetail=data;
                },
                function (err) {

                })
        //assigned data manually as fetchDetail server call is getting error

        var data=[{
            name:'Spider-Man',
            details:'Spider-Man details...'
            },{
            name:'Alita',
            details:'Alita details...'
            },{
            name:'John Wick',
            details:'John Wick details...'
            },{
            name:'Toy Story 4',
            details:'Toy Story 4 details...'
            },{
            name:'Hellboy',
            details:'Hellboy details...'
            },{
            name:'Shazam!',
            details:'Shazam details...'
            },{
            name:'The Lion King',
            details:'The Lion King details ...'
            }
        ]
        $scope.movieDetail=data.filter(x=>{
            return x.name==selectedItem;
        });
    }

})

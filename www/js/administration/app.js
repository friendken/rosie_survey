var administration = angular.module('administration', [
    'ui.router',
    'ui.bootstrap',
//    'administration.services',
//    'administration.filters',
    'administration.controllers'
]).
config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise("/");
    
    $stateProvider
    .state('dashboard', {
      url: "/",
      views: {
        "content": { templateUrl: 'www/partials/temp-dashboard.html'}
      },
      controller: 'dashboardController'
    })
})
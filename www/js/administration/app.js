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
        "content": { templateUrl: 'www/partials/administration/temp-dashboard.html'}
      },
      controller: 'dashboardController'
    })
    .state('question-create', {
      url: "/question-create",
      views: {
        "content": { templateUrl: 'www/partials/administration/temp-question-create.html'}
      },
      controller: 'questionCreateController'
    })
})
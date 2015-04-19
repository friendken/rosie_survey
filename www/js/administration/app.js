var administration = angular.module('administration', [
    'ui.router',
    'ui.bootstrap',
    'administration.services',
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
    .state('question-create-single', {
      url: "/question-create-single",
      views: {
        "content": { templateUrl: 'www/partials/administration/temp-question-create-single.html'}
      },
      controller: 'questionCreateSingleController'
    })
    .state('question-create-group', {
      url: "/question-create-group",
      views: {
        "content": { templateUrl: 'www/partials/administration/temp-question-create-group.html'}
      },
      controller: 'questionCreateGroupController'
    })
    .state('question-create-multiple', {
      url: "/question-create-multiple",
      views: {
        "content": { templateUrl: 'www/partials/administration/temp-question-create-multiple.html'}
      },
      controller: 'questionCreateMultipleController'
    })
    .state('question-create-special', {
      url: "/question-create-special",
      views: {
        "content": { templateUrl: 'www/partials/administration/temp-question-create-special.html'}
      },
      controller: 'questionCreateSpecialController'
    })
    .state('question-list', {
      url: "/question-list",
      views: {
        "content": { templateUrl: 'www/partials/administration/temp-question-list.html'}
      },
      controller: 'questionListController'
    })
})
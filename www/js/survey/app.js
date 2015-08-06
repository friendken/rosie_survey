var survey = angular.module('survey', [
    'ui.router',
    'ui.bootstrap',

    'survey.services',
    'survey.filters',
    'survey.controllers'
]).
    config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/profile");

        $stateProvider
            .state('profile', {
                url: "/profile",
                views: {
                    "content": { templateUrl: 'www/partials/survey/temp-profile.html'}
                },
                controller: 'profileController'
            })
            .state('survey', {
                url: "/survey",
                views: {
                    "content": { templateUrl: 'www/partials/survey/temp-survey.html'}
                },
                controller: 'surveyController'
            })
            .state('contact', {
                url: "/contact",
                views: {
                    "content": { templateUrl: 'www/partials/survey/temp-contact.html'}
                },
                controller: 'contactController'
            })
            .state('start-survey', {
                url: "/start-survey",
                views: {
                    "content": { templateUrl: 'www/partials/survey/temp-start-survey.html'}
                },
                controller: 'startSurveyController'
            })
            .state('choose-mode', {
                url: "/choose-mode",
                views: {
                    "content": { templateUrl: 'www/partials/survey/temp-choose-mode.html'}
                },
                controller: 'chooseModeController'
            })
            .state('thank-you', {
                url: "/thank-you",
                views: {
                    "content": { templateUrl: 'www/partials/survey/temp-thank-you.html'}
                },
                controller: 'thankYouController'
            })
    })
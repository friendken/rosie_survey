var administration = angular.module('administration', [
    'ui.router',
    'ui.bootstrap',
    'administration.services',
    'administration.filters',
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
        "content": { templateUrl: 'www/partials/administration/question_create/temp-question-create-single.html'}
      },
      controller: 'questionCreateSingleController'
    })
    .state('create-text', {
        url: "/create-text",
        views: {
            "content": { templateUrl: 'www/partials/administration/question_create/temp-create-text.html'}
        },
        controller: 'createTextController'
    })
    .state('question-create-group', {
      url: "/question-create-group",
      views: {
        "content": { templateUrl: 'www/partials/administration/question_create/temp-question-create-group.html'}
      },
      controller: 'questionCreateGroupController'
    })
    .state('question-create-multiple', {
      url: "/question-create-multiple",
      views: {
        "content": { templateUrl: 'www/partials/administration/question_create/temp-question-create-multiple.html'}
      },
      controller: 'questionCreateMultipleController'
    })
    .state('question-create-special', {
      url: "/question-create-special",
      views: {
        "content": { templateUrl: 'www/partials/administration/question_create/temp-question-create-special.html'}
      },
      controller: 'questionCreateSpecialController'
    })
    .state('question-edit-single', {
      url: "/question-edit-single/:question_id",
      views: {
        "content": { templateUrl: 'www/partials/administration/question_edit/temp-question-edit-single.html'}
      },
      controller: 'questionEditSingleController'
    })
    .state('question-edit-group', {
      url: "/question-edit-group/:question_id",
      views: {
        "content": { templateUrl: 'www/partials/administration/question_edit/temp-question-edit-group.html'}
      },
      controller: 'questionEditGroupController'
    })
    .state('question-edit-multiple', {
      url: "/question-edit-multiple/:question_id",
      views: {
        "content": { templateUrl: 'www/partials/administration/question_edit/temp-question-edit-multiple.html'}
      },
      controller: 'questionEditMultipleController'
    })
    .state('question-edit-special', {
      url: "/question-edit-special/:question_id",
      views: {
        "content": { templateUrl: 'www/partials/administration/question_edit/temp-question-edit-special.html'}
      },
      controller: 'questionEditSpecialController'
    })
    .state('question-list', {
      url: "/question-list/:mode",
      views: {
        "content": { templateUrl: 'www/partials/administration/temp-question-list.html'}
      },
      controller: 'questionListController'
    })
    .state('question-preview', {
      url: "/question-preview/:question_id",
      views: {
        "content": { templateUrl: 'www/partials/administration/temp-question-preview.html'}
      },
      controller: 'questionPreviewController'
    })
    .state('question-all', {
        url: "/question-all",
        views: {
            "content": { templateUrl: 'www/partials/administration/temp-question-all.html'}
        },
        controller: 'questionAllController'
    })
    .state('message-center', {
        url: "/message-center",
        views: {
            "content": { templateUrl: 'www/partials/administration/message/temp-message-center.html'}
        },
        controller: 'messageCenterController'
    })
    .state('message-detail', {
        url: "/message-detail/:message_id",
        views: {
            "content": { templateUrl: 'www/partials/administration/message/temp-message-detail.html'}
        },
        controller: 'messageDetailController'
    })
    .state('export-answer', {
        url: "/export-answer",
        views: {
            "content": { templateUrl: 'www/partials/administration/temp-export-answer.html'}
        },
        controller: 'exportAnswerController'
    })
})
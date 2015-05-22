
angular.module('survey.controllers', ['ui.bootstrap'])
    .controller('profileController', ['$scope', function ($scope) {
            console.log('load ok');
    }])
    .controller('contactController', ['$scope', function ($scope) {
        console.log('load ok');
    }])
    .controller('menuController',['$scope','$location', function($scope,$location){
        var path = $location.path()
        $('#bs-example-navbar-collapse-1 li').removeClass('active')
        switch (path){
            case "/profile":
                $('#bs-example-navbar-collapse-1 .profile').addClass('active')
                break
            case "/survey":
                $('#bs-example-navbar-collapse-1 .survey').addClass('active')
                break
            default:
                $('#bs-example-navbar-collapse-1 .contact').addClass('active')
                break
        }

        $scope.selectMenu = function($event){
            $('#bs-example-navbar-collapse-1 li').removeClass('active')
            $($event.currentTarget).addClass('active')
            console.log($event)
        }
    }])
    .controller('surveyController', ['$scope', function ($scope) {
        console.log('load ok');
    }])





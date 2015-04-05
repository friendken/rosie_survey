
angular.module('administration.controllers', ['ui.bootstrap'])
    .controller('dashboardController', ['$scope', function($scope) {
        console.log('load ok');
    }])
    .controller('questionCreateController', ['$scope','$timeout', function($scope,$timeout) {
        CKEDITOR.replace('question-en')
        CKEDITOR.replace('question-vn')
        CKEDITOR.replace('question-ch')
        $scope.selects = new Array({name: 'hao'},{name: 'hang'},{name: 'thao'})
        $timeout(function(){
            jQuery('.selectpicker').selectpicker();
        })
        
//        console.log($scope.selects)
//        $rootScope.$broadcast('dataloaded');
        $scope.activeTab = function(tab){
            jQuery('.tab-pane').removeClass('active')
            jQuery('#' + tab).addClass('active')
        }
    }])




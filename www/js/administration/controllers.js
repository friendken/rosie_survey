
angular.module('administration.controllers', ['ui.bootstrap'])
    .controller('dashboardController', ['$scope', function($scope) {
        console.log('load ok');
    }])
    .controller('questionCreateController', ['$scope', function($scope) {
        CKEDITOR.replace('question-en')
        CKEDITOR.replace('question-vn')
        CKEDITOR.replace('question-ch')
        jQuery('.selectpicker').selectpicker();
        $scope.activeTab = function(tab){
            jQuery('.tab-pane').removeClass('active')
            jQuery('#' + tab).addClass('active')
        }
    }])




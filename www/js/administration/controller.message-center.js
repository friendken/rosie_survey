administration.controller('messageCenterController',
    ['$scope','$messageModel','$location',
        function($scope,$messageModel,$location){
            $messageModel.getMessages(function(data){
                $scope.messages = data.messages
            })
            $scope.messageDetail = function(){
                $location.path('message-detail/' + this.item.id)
            }
    }])
    .controller('messageDetailController',
    ['$scope','$messageModel','$stateParams','$rootScope',
        function($scope,$messageModel,$stateParams,$rootScope){
            $messageModel.getMessage($stateParams.message_id,function(data){
                $scope.message = data.message
                $rootScope.$broadcast("refeshBox");
            })
        }])
    .controller('exportAnswerController',
    ['$scope','$answers',
        function($scope,$answers){
            $answers.getNumOfAnswer(function(result){
                $scope.stockNumber = result.stockHolder;
                $scope.noneStockNumber = result.noneStockHolder;
            })
            $scope.exportExcel = function(mode){
                window.location.href = 'http://www.rsbfe.com/administration/answers/exportExcel/' + mode
            }
        }])
administration.controller('questionPreviewModalCtrl',function($scope, $http, $modalInstance, items,$sce){

        $scope.title = items.id
        $scope.content = $sce.trustAsHtml(items.en)
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    })
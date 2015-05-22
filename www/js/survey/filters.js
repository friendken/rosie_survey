angular.module('survey.filters',[])
    .filter('colorBox',function(){
        return function(type){
            switch(type){
                case '1':
                    return 'green';
                    break;
                case '2':
                    return 'light_blue';
                    break;
                case '3':
                    return 'turq';
                    break;
                case '5':
                    return 'dark_blue';
                default:
                    return 'orange';
                    break;
            }
        }
    })
    .filter('pagination',function($sce){
        return function(input, pagination){
            if(pagination[input])
                return $sce.trustAsHtml(pagination[input])
            else
                return $sce.trustAsHtml('<i class="icon-inbox"></i>')
        }
    })
    .filter('number_order',function($sce){
        return function(input, pagination){
            if(pagination[input])
                return $sce.trustAsHtml(pagination[input])
            else
                return $sce.trustAsHtml('')
        }
    })
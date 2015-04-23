angular.module('administration.filters',[])
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
                default:
                    return 'orange';
                    break;
            }
        }
    })
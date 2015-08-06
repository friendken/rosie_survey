angular.module('administration.filters',[])
    .filter('colorBox',function(){
        return function(type){
            switch(type){
                case '1':
                    return 'label-success';
                    break;
                case '2':
                    return 'label-warning';
                    break;
                case '3':
                    return 'label-radio';
                    break;
                case '5':
                    return 'label-checkbox';
                    break;
                case '7':
                    return 'label-scale';
                    break;
                case '6':
                    return 'label-radio-with-textbox';
                    break;
                case '8':
                    return 'label-checkbox-with-textbox';
                    break;
                case '9':
                    return 'label-text';
                    break;
                default:
                    return 'label-important';
                    break;
            }
        }
    })
    .filter('labelType',function(){
        return function(type){
            switch(type){
                case '1':
                    return 'Single';
                    break;
                case '2':
                    return 'Group';
                    break;
                case '3':
                    return 'Radio';
                    break;
                case '5':
                    return 'Checkbox';
                    break;
                case '7':
                    return 'Scale';
                    break;
                case '6':
                    return 'RadioText';
                    break;
                case '8':
                    return 'CheckText';
                    break;
                case '9':
                    return 'Text';
                    break;
                default:
                    return 'Special';
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
    .filter('initMode',function(){
        return function(input,mode){
            if(mode == 3)
                return 'true'
            else if(input == mode)
                return 'true'
            else
                return 'false'
        }
    })
    .filter('formatDate',function(){
        return function(input){
            return moment(input).format('DD MMM YYYY')
        }
    })
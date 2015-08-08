angular.module('survey.services', [])
        .service('language',['$http',function($http){
            return{
                getLanguage: function(callback){
                    $http.get('language.json').success(function(data){
                        callback(data)
                    })
                }
            }    
        }])
        .service('$question',['$http',function($http){
            return{
                getQuestion: function(mode,pagination,callback){
                    $http.get(config.base + 'survey/survey/getSurvey/' + mode + '/' + pagination).success(function(data){
                        callback(data)
                    })
                }
            }
        }])
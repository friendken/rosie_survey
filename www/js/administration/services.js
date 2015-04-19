angular.module('administration.services', [])
        .service('initCkeditor', [function () {
            return{
                init: function () {
                    CKEDITOR.replace('question-en', {
                        entities_latin: false,
                        entities_greek: false
                    })
                    CKEDITOR.replace('question-vn', {
                        entities_latin: false,
                        entities_greek: false
                    })
                    CKEDITOR.replace('question-ch', {
                        entities_latin: false,
                        entities_greek: false
                    });
                }
            };
        }])
        .service('questionGroup',['$http',function($http){
            return{
                getQuestionGroup: function(callback){
                    $http.get(config.base + 'administration/questions/getQuestionGroup').success(function(data){
                        data.question_group.unshift({id:0,name:'Select Group'})
                        callback(data)
                    })
                }
            }    
        }])
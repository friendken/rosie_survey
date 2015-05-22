angular.module('survey.services', [])
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
        .service('alert',[function(){
            return {
                success: function(el){
                    var html = '<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert"><i class="icon-remove"></i></button><strong>Well done!</strong><br> You successfully saved this...</div>'
                }
            }
        }])
        .service('questionGroup',['$http',function($http){
            return{
                getGroup: function(callback){
                    $http.get(config.base + 'administration/questions/getGroup').success(function(data){
                        data.question_group.unshift({id:0,name:'Select Group'})
                        callback(data)
                    })
                },
                getQuestionDetail: function(question_id,callback){
                    $http.get(config.base + 'administration/questions/getQuestionDetail/' + question_id).success(function(data){
                        callback(data)
                    })
                }
            }    
        }])
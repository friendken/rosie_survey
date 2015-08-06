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
        .service('alert',[function(){
            return {
                success: function(el){
                    var html = '<div class="alert alert-success"><button type="button" class="close" data-dismiss="alert"><i class="icon-remove"></i></button><strong>Well done!</strong><br> You successfully saved this...</div>'
                }
            }
        }])
        .service('$messageModel',['$http',function($http){
            return {
                getMessages: function(callback){
                    $http.get(config.base + 'survey/contact/getMessages').success(function(data){
                        callback(data)
                    })
                },
                getMessageUnread: function(callback){
                    $http.get(config.base + 'survey/contact/getMessageUnread').success(function(data){
                        callback(data)
                    })
                },
                getMessage: function(message_id,callback){
                    $http.get(config.base + 'survey/contact/getMessage/' + message_id).success(function(data){
                        callback(data)
                    })
                }
            }
        }])
        .service('$answers',['$http', function($http){
            return {
                getNumOfAnswer: function(callback){
                    $http.get(config.base + 'administration/answers/getNumOfAnswer').success(function(data){
                        callback(data)
                    })
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
                getQuestionByMode: function(mode,callback){
                    $http.get(config.base + 'administration/questions/getQuestionByMode/' + mode).success(function(data){
                        callback(data)
                    })
                },
                getQuestionDetail: function(question_id,callback){
                    $http.get(config.base + 'administration/questions/getQuestionDetail/' + question_id).success(function(data){
                        callback(data)
                    })
                },
                getMode: function(callback){
                    $http.get(config.base + 'administration/questions/getMode').success(function(data){
                        callback(data)
                    })
                },
                getPagination: function(mode,callback){
                    $http.get(config.base + 'administration/pagination/getPagination/' + mode).success(function(data){
                        callback(data)
                    })
                },
                deleteQuestion: function(question_id,callback){
                    $http.get(config.base + 'administration/questions/deleteQuestion/' + question_id).success(function(data){
                        callback(data)
                    })
                }
            }    
        }])
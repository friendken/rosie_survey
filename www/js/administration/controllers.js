
angular.module('administration.controllers', ['ui.bootstrap'])
    .controller('dashboardController', ['$scope', function ($scope) {
            console.log('load ok');
        }])
    .controller('headerController',['$http','$scope',function($http,$scope){
        $scope.logout = function(){
            console.log('ok')
        }
    }])
    .controller('questionCreateSingleController', 
                ['$scope', '$timeout', '$http','initCkeditor','questionGroup', 
        function ($scope, $timeout, $http, initCkeditor,questionGroup) {
            initCkeditor.init();
            $scope.typeQuestion = 1;
            questionGroup.getGroup(function(data){
                $scope.groups = data.question_group
                $timeout(function () {
                    jQuery('.selectpicker').selectpicker();
                })
                $scope.groupQuestion = 0
            });
            
            $scope.activeTab = function (tab) {
                jQuery('.tab-pane').removeClass('active');
                jQuery('#' + tab).addClass('active');
            };
            
            $scope.save = function(){
                if($scope.groupQuestion == 0){
                    alert('please select a group for question')
                    return false
                }
                var data = {question: {}};
                //get question
                data['question']['en'] = CKEDITOR.instances['question-en'].getData().trim();
                data['question']['vn'] = CKEDITOR.instances['question-vn'].getData().trim();
                data['question']['ch'] = CKEDITOR.instances['question-ch'].getData().trim();
                data['question']['question_type'] = $scope.typeQuestion;
                data['question']['question_group_id'] = $scope.groupQuestion;
                
                $http.post(config.base + 'administration/questions/addQuestionSingle',data)
                        .success(function(result){
                            console.log(result);
                            alert('Well done! You successfully saved this...')
                        });
            };
        }])
    .controller('questionCreateMultipleController', 
                ['$scope', '$timeout', '$http','initCkeditor', 'questionGroup',
        function ($scope, $timeout, $http,initCkeditor, questionGroup) {
            initCkeditor.init();
            $scope.typeQuestion = '3';
            questionGroup.getGroup(function(data){
                $scope.groups = data.question_group
                $timeout(function () {
                    jQuery('.selectpicker').selectpicker();
                })
                $scope.groupQuestion = 0
            });
            $scope.addMoreAnswer = function(){
                var type_answer = ''
                if($scope.typeQuestion == 3)
                    type_answer = 'radio'
                else
                    type_answer = 'checkbox'

                jQuery('.type-question').children('div').append('<div><input type="' + type_answer + '"/><input placeholder="type here" class="question-answer" type="text" style="border: 0;width: 500px;"/></div>')
                jQuery('.type-question input:last-child').focus()
            }
            
            $scope.activeTab = function (tab) {
                jQuery('.tab-pane').removeClass('active');
                jQuery('#' + tab).addClass('active');
            };
            
            $scope.save = function(){
                if($scope.groupQuestion == 0){
                    alert('please select a group for question')
                    return false
                }
                var data = {question: {},answer: {}};
                //get question
                data['question']['en'] = CKEDITOR.instances['question-en'].getData().trim();
                data['question']['vn'] = CKEDITOR.instances['question-vn'].getData().trim();
                data['question']['ch'] = CKEDITOR.instances['question-ch'].getData().trim();
                data['question']['question_type'] = $scope.typeQuestion;
                data['question']['question_group_id'] = $scope.groupQuestion;
                //get answer
                var languages = ['en','vn','ch']
                languages.forEach(function(language){
                    jQuery('.answer-' + language + ' .question-answer').each(function(){
                        if(data['answer'][language])
                            data['answer'][language].push(this.value);
                        else
                            data['answer'][language] = new Array(this.value);
                    });
                });

                $http.post(config.base + 'administration/questions/addQuestionMultiple',data)
                        .success(function(result){
                            console.log(result);
                            alert('Well done! You successfully saved this...')
                        });
            };
        }])
    .controller('questionCreateGroupController', 
            ['$scope', '$timeout', '$http','initCkeditor', 'questionGroup',
        function ($scope, $timeout, $http, initCkeditor, questionGroup) {
            initCkeditor.init()
            $scope.typeQuestion = '2';
            questionGroup.getGroup(function(data){
                $scope.groups = data.question_group
                $timeout(function () {
                    jQuery('.selectpicker').selectpicker();
                })
                $scope.groupQuestion = 0
            });
            
            $scope.addMoreAnswer = function(){
                jQuery('.type-question').append('<div><textarea class="span12 sub-question" cols="40" rows="5"></textarea></div>')
                jQuery('.type-question textarea:last-child').focus()
            }
            
            $scope.activeTab = function (tab) {
                jQuery('.tab-pane').removeClass('active');
                jQuery('#' + tab).addClass('active');
            };
            
            $scope.save = function(){
                if($scope.groupQuestion == 0){
                    alert('please select a group for question')
                    return false
                }
                var data = {question: {},sub_question: {}};
                //get question
                data['question']['en'] = CKEDITOR.instances['question-en'].getData().trim();
                data['question']['vn'] = CKEDITOR.instances['question-vn'].getData().trim();
                data['question']['ch'] = CKEDITOR.instances['question-ch'].getData().trim();
                data['question']['question_type'] = $scope.typeQuestion;
                data['question']['question_group_id'] = $scope.groupQuestion;
                
                //get answer
                var languages = ['en','vn','ch']
                languages.forEach(function(language){
                    jQuery('.answer-' + language + ' .sub-question').each(function(){
                        if(data['sub_question'][language])
                            data['sub_question'][language].push(this.value);
                        else
                            data['sub_question'][language] = new Array(this.value);
                    });
                });
                
                $http.post(config.base + 'administration/questions/addQuestionGroup',data)
                        .success(function(result){
                            console.log(result);
                            alert('Well done! You successfully saved this...')
                        });
            };
        }])
    .controller('questionCreateSpecialController', 
                ['$scope', '$timeout', '$http','initCkeditor','questionGroup', 
        function ($scope, $timeout, $http, initCkeditor,questionGroup) {
            initCkeditor.init();
            $scope.typeQuestion = 4;
            questionGroup.getGroup(function(data){
                $scope.groups = data.question_group;
                $timeout(function () {
                    jQuery('.selectpicker').selectpicker();
                });
                $scope.groupQuestion = 0;
            });
            
            $scope.activeTab = function (tab) {
                jQuery('.tab-pane').removeClass('active');
                jQuery('#' + tab).addClass('active');
            };
            
            $scope.save = function(){
                if($scope.groupQuestion == 0){
                    alert('please select a group for question');
                    return false;
                }
                var data = {question: {}};
                //get question
                data['question']['en'] = CKEDITOR.instances['question-en'].getData().trim();
                data['question']['vn'] = CKEDITOR.instances['question-vn'].getData().trim();
                data['question']['ch'] = CKEDITOR.instances['question-ch'].getData().trim();
                data['question']['question_type'] = $scope.typeQuestion;
                data['question']['question_group_id'] = $scope.groupQuestion;
                
                $http.post(config.base + 'administration/questions/addQuestionSpecial',data)
                        .success(function(result){
                            console.log(result);
                            alert('Well done! You successfully saved this...')
                        });
            };
        }])
    .controller('questionListController',
                ['$http','$scope','$timeout',
        function($http,$scope,$timeout){
            $scope.init = function(){
                $http.get(config.base + 'administration/questions/getQuestion').success(function(data){
                    $scope.questions = data.questions;
                    $scope.pagination = data.pagination
                    $timeout(function(){
                        jQuery("#sortable_boxes").sortable({
                            connectWith: ".well",
                            items: ".well",
                            opacity: 0.8,
                            coneHelperSize: true,
                            placeholder: 'sortable-box-placeholder round-all',
                            forcePlaceholderSize: true,
                            tolerance: "pointer",
                            update: function(event,ui){
                                $scope.undateOrder(ui)
                            }
                          });
                    });
                });
            };
            $scope.init();
            $scope.setPagination = function($event){
                
                var number = 0;
                var index = jQuery('.pagination_number').index($event.currentTarget)
                var order = new Array();
                jQuery('.pagination_number').each(function(key){
                    if(key <= index){
                        if(jQuery(this).data('number')){
                            number = jQuery(this).data('number');
                        }
                    }else{
                        jQuery(this).html('<i class="icon-inbox"></i>');
                        jQuery(this).removeData('number');
                    }
                    
                })
                
                jQuery($event.currentTarget).html(number + 1)
                jQuery($event.currentTarget).data('number',number + 1)
                jQuery($event.currentTarget).css('color','white')
                jQuery($event.currentTarget).css('font-size','20px')
                
                jQuery('.pagination_number').each(function(key){
                    if(jQuery(this).data('number')){
                        number = jQuery(this).data('number');
                        order.push({pagination: number, order_id: key + 1})
                    }
                })
                
                //update order question
                $http.post(config.base + 'administration/questions/updatePagination',order).success(function(){
                    
                })
                
            }
            $scope.undateOrder = function(el){
                var order = new Array(),
                    i = 1;
                jQuery('.order-question').each(function(){
                    order.push({order: i,questionId: jQuery(this).data('question-id')})
                    i++
                })
                jQuery('.pagination_number').each(function(key){
                    jQuery(this).html('<i class="icon-inbox"></i>');
                    jQuery(this).removeData('number');
                })
                
                $http.post(config.base + 'administration/questions/updateOrder',order).success(function(data){
                    console.log(data)
                })
            }
    }])
    .controller('questionPreviewController',
                ['$http','$scope','$timeout','$stateParams','questionGroup','$sce',
        function($http,$scope,$timeout,$stateParams,questionGroup,$sce){
            $scope.activeTab = function (tab) {
                jQuery('.tab-pane').removeClass('active');
                jQuery('#' + tab).addClass('active');
            };
            questionGroup.getQuestionDetail($stateParams.question_id,function(data){
                $scope.question = data.question;
                $scope.renderUrl(data.question.question_type)
                $scope.question.en = $sce.trustAsHtml($scope.question.en);
                $scope.question.vn = $sce.trustAsHtml($scope.question.vn);
                $scope.question.ch = $sce.trustAsHtml($scope.question.ch);
            });
            
            $scope.renderUrl = function(question_type){
                switch (question_type){
                    case "1":
                        $scope.question_type_name = 'single'
                        break;
                    case "2":
                        $scope.question_type_name = 'group'
                        break;
                    case "3":
                    case "5":
                        $scope.question_type_name = 'multiple'
                        break;
                    default:
                        $scope.question_type_name = 'special'
                        break
                }
            }
            
    }])
    .controller('questionEditSingleController', 
                ['$scope', '$timeout', '$http','initCkeditor','questionGroup','$stateParams',
        function ($scope, $timeout, $http, initCkeditor,questionGroup,$stateParams) {
            
            $scope.typeQuestion = 1;
            $scope.initSelectBox = function(question_group_id){
                questionGroup.getGroup(function(data){
                    $scope.groups = data.question_group
                    $timeout(function () {
                        jQuery('.selectpicker').val(question_group_id)
                        jQuery('.selectpicker').selectpicker();
                    })
                    $scope.groupQuestion = question_group_id
                });
            }
            questionGroup.getQuestionDetail($stateParams.question_id,function(data){
                $scope.question = data.question
                initCkeditor.init();
                $scope.initSelectBox(data.question.question_group_id)
            })
            
            $scope.activeTab = function (tab) {
                jQuery('.tab-pane').removeClass('active');
                jQuery('#' + tab).addClass('active');
            };
            
            $scope.save = function(){
                if($scope.groupQuestion == 0){
                    alert('please select a group for question')
                    return false
                }
                var data = {question: {}};
                //get question
                data['question']['en'] = CKEDITOR.instances['question-en'].getData().trim();
                data['question']['vn'] = CKEDITOR.instances['question-vn'].getData().trim();
                data['question']['ch'] = CKEDITOR.instances['question-ch'].getData().trim();
                data['question']['question_type'] = $scope.typeQuestion;
                data['question']['question_group_id'] = $scope.groupQuestion;
                data['question']['id'] = $stateParams.question_id
                
                $http.post(config.base + 'administration/questions/addQuestionSingle',data)
                        .success(function(result){
                            console.log(result);
                            alert('Well done! You successfully saved this...')
                        });
            };
        }])
    .controller('questionEditMultipleController', 
                ['$scope', '$timeout', '$http','initCkeditor', 'questionGroup', '$stateParams',
        function ($scope, $timeout, $http,initCkeditor, questionGroup, $stateParams) {

            $scope.initSelectBox = function (question_group_id){
                questionGroup.getGroup(function(data){
                $scope.groups = data.question_group
                $timeout(function () {
                    jQuery('.selectpicker').val(question_group_id)
                    jQuery('.selectpicker').selectpicker();
                })
                $scope.groupQuestion = question_group_id
            });
            }
            questionGroup.getQuestionDetail($stateParams.question_id,function(data){
                $scope.question = data.question
                $scope.typeQuestion = data.question.question_type;

                initCkeditor.init();
                $scope.initSelectBox(data.question.question_group_id)
            })
            $scope.addMoreAnswer = function(){
                jQuery('.type-question').append('<div><input type="radio"/><input placeholder="type here" class="question-answer" type="text" style="border: 0;width: 500px;"/></div>')
                jQuery('.type-question input:last-child').focus()
            }
            
            $scope.activeTab = function (tab) {
                jQuery('.tab-pane').removeClass('active');
                jQuery('#' + tab).addClass('active');
            };
            
            $scope.save = function(){
                if($scope.groupQuestion == 0){
                    alert('please select a group for question')
                    return false
                }
                var data = {question: {},answer: {}};
                //get question
                data['question']['en'] = CKEDITOR.instances['question-en'].getData().trim();
                data['question']['vn'] = CKEDITOR.instances['question-vn'].getData().trim();
                data['question']['ch'] = CKEDITOR.instances['question-ch'].getData().trim();
                data['question']['question_type'] = $scope.typeQuestion;
                data['question']['question_group_id'] = $scope.groupQuestion;
                data['question']['id'] = $stateParams.question_id;
                //get answer
                var languages = ['en','vn','ch']
                languages.forEach(function(language){
                    jQuery('.answer-' + language + ' .question-answer').each(function(){
                        if(data['answer'][language])
                            data['answer'][language].push(this.value);
                        else
                            data['answer'][language] = new Array(this.value);
                    });
                });
                
                $http.post(config.base + 'administration/questions/editQuestionMultiple',data)
                        .success(function(result){
                            console.log(result);
                            alert('Well done! You successfully saved this...')
                        });
            };
        }])
    .controller('questionEditGroupController', 
            ['$scope', '$timeout', '$http','initCkeditor', 'questionGroup','$stateParams',
        function ($scope, $timeout, $http, initCkeditor, questionGroup,$stateParams) {
            
            $scope.typeQuestion = '2';
            $scope.initSelectBox = function (question_group_id){
                questionGroup.getGroup(function(data){
                $scope.groups = data.question_group
                $timeout(function () {
                    jQuery('.selectpicker').val(question_group_id)
                    jQuery('.selectpicker').selectpicker();
                })
                $scope.groupQuestion = question_group_id
            });
            }
            questionGroup.getQuestionDetail($stateParams.question_id,function(data){
                $scope.question = data.question
                initCkeditor.init();
                $scope.initSelectBox(data.question.question_group_id)
            })
            
            $scope.addMoreAnswer = function(){
                jQuery('.type-question').append('<div><textarea class="span12 sub-question" cols="40" rows="5"></textarea></div>')
                jQuery('.type-question textarea:last-child').focus()
            }
            
            $scope.activeTab = function (tab) {
                jQuery('.tab-pane').removeClass('active');
                jQuery('#' + tab).addClass('active');
            };
            
            $scope.save = function(){
                if($scope.groupQuestion == 0){
                    alert('please select a group for question')
                    return false
                }
                
                var data = {question: {},sub_question: {}};
                //get question
                data['question']['en'] = CKEDITOR.instances['question-en'].getData().trim();
                data['question']['vn'] = CKEDITOR.instances['question-vn'].getData().trim();
                data['question']['ch'] = CKEDITOR.instances['question-ch'].getData().trim();
                data['question']['question_type'] = $scope.typeQuestion;
                data['question']['question_group_id'] = $scope.groupQuestion;
                data['question']['id'] = $stateParams.question_id
                
                //get answer
                var languages = ['en','vn','ch']
                languages.forEach(function(language){
                    jQuery('.answer-' + language + ' .sub-question').each(function(){
                        if(data['sub_question'][language])
                            data['sub_question'][language].push(this.value);
                        else
                            data['sub_question'][language] = new Array(this.value);
                    });
                });
                
                $http.post(config.base + 'administration/questions/editQuestionGroup',data)
                        .success(function(result){
                            console.log(result);
                            alert('Well done! You successfully saved this...')
                        });
            };
        }])
    .controller('questionEditSpecialController', 
                ['$scope', '$timeout', '$http','initCkeditor','questionGroup','$stateParams', 
        function ($scope, $timeout, $http, initCkeditor,questionGroup,$stateParams) {
            
            $scope.typeQuestion = 4;
            $scope.initSelectBox = function (question_group_id){
                questionGroup.getGroup(function(data){
                $scope.groups = data.question_group
                $timeout(function () {
                    jQuery('.selectpicker').val(question_group_id)
                    jQuery('.selectpicker').selectpicker();
                })
                $scope.groupQuestion = question_group_id
            });
            }
            questionGroup.getQuestionDetail($stateParams.question_id,function(data){
                $scope.question = data.question
                initCkeditor.init();
                $scope.initSelectBox(data.question.question_group_id)
            })
            
            $scope.activeTab = function (tab) {
                jQuery('.tab-pane').removeClass('active');
                jQuery('#' + tab).addClass('active');
            };
            
            $scope.save = function(){
                if($scope.groupQuestion == 0){
                    alert('please select a group for question');
                    return false;
                }
                var data = {question: {}};
                //get question
                data['question']['en'] = CKEDITOR.instances['question-en'].getData().trim();
                data['question']['vn'] = CKEDITOR.instances['question-vn'].getData().trim();
                data['question']['ch'] = CKEDITOR.instances['question-ch'].getData().trim();
                data['question']['question_type'] = $scope.typeQuestion;
                data['question']['question_group_id'] = $scope.groupQuestion;
                data['question']['id'] = $stateParams.question_id
                
                $http.post(config.base + 'administration/questions/addQuestionSingle',data)
                        .success(function(result){
                            console.log(result);
                            alert('Well done! You successfully saved this...')
                        });
            };
        }])




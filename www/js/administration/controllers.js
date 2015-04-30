
angular.module('administration.controllers', ['ui.bootstrap'])
    .controller('dashboardController', ['$scope', function ($scope) {
            console.log('load ok');
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
                
                $http.post(config.base + 'administration/questions/addQuestionSingle',data)
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
            $scope.undateOrder = function(el){
                var order = new Array(),
                    i = 1;
                jQuery('.order-question').each(function(){
                    order.push({order: i,questionId: jQuery(this).data('question-id')})
                    i++
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
            $scope.typeQuestion = '3';
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




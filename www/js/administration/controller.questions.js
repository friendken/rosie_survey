
var administration = angular.module('administration.controllers', ['ui.bootstrap'])
    .controller('dashboardController', ['$scope', function ($scope) {
            console.log('load ok');
        }])
    .controller('headerController',['$http','$scope','$messageModel',function($http,$scope,$messageModel){
        $scope.init = function(){
            $messageModel.getMessageUnread(function(data){
                $scope.messages = data.messages
                $scope.count = data.messages.length
            })
        }
        $scope.init();

        $scope.$on("refeshBox", function (event, args) {
            $scope.init()
        });
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
            questionGroup.getMode(function(data){
                $scope.modes = data
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

                //get question mode
                var mode = new Array();
                jQuery('.question-mode input[type=checkbox]:checked').each(function(){
                    mode.push(this.value)
                })
                if(mode.length == 2 || mode.length == 0)
                    data['question']['mode'] = 3
                else
                    data['question']['mode'] = mode[0]

                $http.post(config.base + 'administration/questions/addQuestionSingle',data)
                        .success(function(result){
                            console.log(result);
                            alert('Well done! You successfully saved this...')
                        });
            };
        }])
    .controller('createTextController',
            ['$scope', '$timeout', '$http','initCkeditor','questionGroup',
        function ($scope, $timeout, $http, initCkeditor,questionGroup) {
            initCkeditor.init();
            $scope.typeQuestion = 9;
            questionGroup.getGroup(function(data){
                $scope.groups = data.question_group
                $timeout(function () {
                    jQuery('.selectpicker').selectpicker();
                })
                $scope.groupQuestion = 0
            });
            questionGroup.getMode(function(data){
                $scope.modes = data
            })


            $scope.activeTab = function (tab) {
                jQuery('.tab-pane').removeClass('active');
                jQuery('#' + tab).addClass('active');
            };

            $scope.save = function(){
                var data = {question: {}};

                //get question
                data['question']['en'] = CKEDITOR.instances['question-en'].getData().trim();
                data['question']['vn'] = CKEDITOR.instances['question-vn'].getData().trim();
                data['question']['ch'] = CKEDITOR.instances['question-ch'].getData().trim();
                data['question']['question_type'] = $scope.typeQuestion;
                data['question']['question_group_id'] = $scope.groupQuestion;

                //get question mode
                var mode = new Array();
                jQuery('.question-mode input[type=checkbox]:checked').each(function(){
                    mode.push(this.value)
                })
                if(mode.length == 2 || mode.length == 0)
                    data['question']['mode'] = 3
                else
                    data['question']['mode'] = mode[0]

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
            $scope.answers = {}
            $scope.answers['en'] = [];
            $scope.answers['vn'] = [];
            $scope.answers['ch'] = [];

            questionGroup.getGroup(function(data){
                $scope.groups = data.question_group
                $timeout(function () {
                    jQuery('.selectpicker').selectpicker();
                })
                $scope.groupQuestion = 0
            });
            questionGroup.getMode(function(data){
                $scope.modes = data
                console.log($scope.mode)
            })

            $scope.moreAnswer = function(){
                $scope.answers.en.push({value: ''});
                $scope.answers.vn.push({value: ''});
                $scope.answers.ch.push({value: ''});
            }
            
            //$scope.activeTab = function (tab) {
            //    jQuery('.tab-pane').removeClass('active');
            //    jQuery('#' + tab).addClass('active');
            //};
            
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
                data['answer'] = $scope.answers
                //get question mode
                var mode = new Array();
                jQuery('.question-mode input[type=checkbox]:checked').each(function(){
                    mode.push(this.value)
                })
                if(mode.length == 2 || mode.length == 0)
                    data['question']['mode'] = 3
                else
                    data['question']['mode'] = mode[0]

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
            questionGroup.getMode(function(data){
                $scope.modes = data
                console.log($scope.mode)
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
                //get question mode
                var mode = new Array();
                jQuery('.question-mode input[type=checkbox]:checked').each(function(){
                    mode.push(this.value)
                })
                if(mode.length == 2 || mode.length == 0)
                    data['question']['mode'] = 3
                else
                    data['question']['mode'] = mode[0]

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
            questionGroup.getMode(function(data){
                $scope.modes = data
                console.log($scope.mode)
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

                //get question mode
                var mode = new Array();
                jQuery('.question-mode input[type=checkbox]:checked').each(function(){
                    mode.push(this.value)
                })
                if(mode.length == 2 || mode.length == 0)
                    data['question']['mode'] = 3
                else
                    data['question']['mode'] = mode[0]

                $http.post(config.base + 'administration/questions/addQuestionSpecial',data)
                        .success(function(result){
                            console.log(result);
                            alert('Well done! You successfully saved this...')
                        });
            };
        }])
    .controller('questionListController',
                ['$http','$scope','$timeout','$stateParams','questionGroup','$filter','$modal',
        function($http,$scope,$timeout,$stateParams,questionGroup, $filter,$modal){
            $scope.data_pagination = new Array()
            var modeArray = {'stock': 1, 'none-stock': 2}
            questionGroup.getQuestionByMode(modeArray[$stateParams.mode],function(data){
                $scope.questions = data.questions;
                $timeout(function () {
                    jQuery(".question-div").draggable({
                        revert: 'invalid',
                        appendTo: "body",
                        stop: function(event, ui){
                            setTimeout(function() {
                                ui.helper.unbind("click.prevent");
                            }, 300);
                            jQuery(this).draggable('option', 'revert', 'invalid');
                        }
                    });
                });
            });
            questionGroup.getPagination(modeArray[$stateParams.mode],function(data){
                if(data.pagination.length == 0)
                    data.pagination = new Array({mode_id: modeArray[$stateParams.mode],pagination: 1,value: new Array})
                $scope.data_pagination = data.pagination
                $scope.questionsData = data.questions
                $timeout(function(){
                    jQuery(".content-page").droppable({
                        tolerance: 'touch',
                        drop: function(event, ui) {
                            if(jQuery(ui.draggable).hasClass('question-div')){
                                var position = jQuery(this).parent().data('position')
                                var question_id = jQuery(ui.draggable).data('id')
                                $scope.pagination(position,question_id)
                            }
                        }
                    });
                    jQuery(".sort-question").sortable({
                        connectWith: ".droppable-div",
                        items: ".droppable-div",
                        opacity: 0.8,
                        coneHelperSize: true,
                        forcePlaceholderSize: true,
                        tolerance: "pointer",
                        update: function(event,ui){
                            $scope.updateOrderQuestion(event)
                        }
                    });
                })
            })
            $scope.updateOrderQuestion = function(el){
                var position = jQuery(el.target).parent().data('position');
                var new_value = new Array();
                jQuery(el.target).find('div').each(function(){
                    new_value.push(jQuery(this).data('id'))
                })
                $scope.data_pagination[position].value = new_value
                $scope.updatePagination()
            }
            $scope.pagination = function(position,question_id){
                for(var x in $scope.questions){
                    if($scope.questions[x].id == question_id){
                        $scope.data_pagination[position].value.push($scope.questions[x].id)
                        $scope.questions.splice(x,1)
                        break
                    }
                }
                $scope.$apply()
            }
            $scope.addMorePage = function(){
                var page = jQuery('.list_page').length
                $scope.data_pagination.push({mode_id: modeArray[$stateParams.mode],pagination: page + 1,value: new Array})
                $timeout(function(){
                    jQuery(".content-page").droppable({
                        tolerance: 'touch',
                        drop: function(event, ui) {
                            if(jQuery(ui.draggable).hasClass('question-div')) {
                                var position = jQuery(this).parent().data('position')
                                var question_id = jQuery(ui.draggable).data('id')
                                $scope.pagination(position, question_id)
                            }
                        }
                    });
                    jQuery(".sort-question").sortable({
                        connectWith: ".droppable-div",
                        items: ".droppable-div",
                        opacity: 0.8,
                        coneHelperSize: true,
                        forcePlaceholderSize: true,
                        tolerance: "pointer",
                        update: function(event,ui){
                            $scope.updateOrderQuestion(event)
                        }
                      });

                })
            }
            $scope.updatePagination = function(){
                if($scope.data_pagination.length > 0){
                    $http.post(config.base + 'administration/pagination/updatePagination',{data: $scope.data_pagination,mode: modeArray[$stateParams.mode]},function(result){
                        console.log(result)
                    })
                }
            }
            $scope.$watch('data_pagination',function(){
                $scope.updatePagination()
            },true)
            $scope.removeQuestion = function($event){
                var position = jQuery($event.currentTarget).parents('.list_page').data('position')
                var question_id = $scope.data_pagination[position].value[this.$index]
                var question = $filter('filter')($scope.questionsData,{id: question_id})[0]
                $scope.questions.push(question)
                $scope.data_pagination[position].value.splice(this.$index,1)
                $http.get(config.base + 'administration/pagination/removeQuestionInPagination/' + question_id + '/'+ modeArray[$stateParams.mode]).success(function(result){
                    console.log(result)
                    $timeout(function () {
                        jQuery(".question-div").draggable({
                            revert: 'invalid',
                            appendTo: "body",
                            stop: function(event, ui){
                                setTimeout(function() {
                                    ui.helper.unbind("click.prevent");
                                }, 300);
                                jQuery(this).draggable('option', 'revert', 'invalid');
                            }
                        });
                    });
                })
            }
            $scope.removePage = function(){
                if(confirm('Are you sure?')){
                    $scope.data_pagination.splice(this.$index,1)
                    jQuery.each($scope.data_pagination,function(key,row){
                        row.pagination = key + 1
                    })
                }
            }
            $scope.showQuestionDetail = function($event){
                if(!$event)
                    var question = $scope.questions[this.$index]
                else{
                    var position = jQuery($event.currentTarget).parents('.list_page').data('position')
                    var question_id = $scope.data_pagination[position].value[this.$index]
                    var question = $filter('filter')($scope.questionsData,{id: question_id})[0]

                }

                var modalInstance = $modal.open({
                    templateUrl: 'questionPreviewModal',
                    controller: 'questionPreviewModalCtrl',
                    size: null,
                    resolve: {
                        items: function () {
                            return question;
                        }
                    }
                });
                modalInstance.result.then(function () {
                    $scope.init();
                });
            }
    }])
    .controller('questionAllController',
                ['$http','$scope','questionGroup',
        function($http,$scope,questionGroup){
            $scope.init = function(){
                $http.get(config.base + 'administration/questions/getQuestion').success(function(data){
                    $scope.questions = data.questions;
                });
            };
            $scope.init();
            $scope.deleteQuestion = function(){
                if(!confirm("Are your sure?"))
                    return false;
                var question_id = this.item.id,
                    deleteId = this.$index
                questionGroup.deleteQuestion(question_id,function(data){
                    if(data.status == 'success')
                        $scope.questions.splice(deleteId,1)
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
                    case "9":
                        $scope.question_type_name = 'single'
                        break;
                    case "2":
                        $scope.question_type_name = 'group'
                        break;
                    case "3":
                    case "5":
                    case "6":
                    case "7":
                    case "8":
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
            

            $scope.initSelectBox = function(question_group_id){
                questionGroup.getGroup(function(data){
                    $scope.groups = data.question_group
                    $timeout(function () {
                        jQuery('.selectpicker').val(question_group_id)
                        jQuery('.selectpicker').selectpicker();
                    })
                    $scope.groupQuestion = question_group_id
                });
                questionGroup.getMode(function(data){
                    $scope.modes = data
                })
            }
            questionGroup.getQuestionDetail($stateParams.question_id,function(data){
                $scope.question = data.question
                $scope.typeQuestion = data.question.question_type
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

                //get question mode
                var mode = new Array();
                jQuery('.question-mode input[type=checkbox]:checked').each(function(){
                    mode.push(this.value)
                })
                if(mode.length == 2 || mode.length == 0)
                    data['question']['mode'] = 3
                else
                    data['question']['mode'] = mode[0]
                
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
                questionGroup.getMode(function(data){
                    $scope.modes = data
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
                data['answer'] = $scope.question.question_detail

                //get question mode
                var mode = new Array();
                jQuery('.question-mode input[type=checkbox]:checked').each(function(){
                    mode.push(this.value)
                })
                if(mode.length == 2 || mode.length == 0)
                    data['question']['mode'] = 3
                else
                    data['question']['mode'] = mode[0]

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
                questionGroup.getMode(function(data){
                    $scope.modes = data
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
                //get question mode
                var mode = new Array();
                jQuery('.question-mode input[type=checkbox]:checked').each(function(){
                    mode.push(this.value)
                })
                if(mode.length == 2 || mode.length == 0)
                    data['question']['mode'] = 3
                else
                    data['question']['mode'] = mode[0]
                
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
                questionGroup.getMode(function(data){
                    $scope.modes = data
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

                //get question mode
                var mode = new Array();
                jQuery('.question-mode input[type=checkbox]:checked').each(function(){
                    mode.push(this.value)
                })
                if(mode.length == 2 || mode.length == 0)
                    data['question']['mode'] = 3
                else
                    data['question']['mode'] = mode[0]

                $http.post(config.base + 'administration/questions/addQuestionSingle',data)
                        .success(function(result){
                            console.log(result);
                            alert('Well done! You successfully saved this...')
                        });
            };
        }])




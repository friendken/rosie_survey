
angular.module('administration.controllers', ['ui.bootstrap'])
    .controller('dashboardController', ['$scope', function ($scope) {
            console.log('load ok');
        }])
    .controller('questionCreateController', ['$scope', '$timeout', '$http', function ($scope, $timeout, $http) {
            CKEDITOR.replace('question-en')
            CKEDITOR.replace('question-vn')
            CKEDITOR.replace('question-ch')
            $scope.typeQuestion = '';
            $scope.init = function () {
                $http.get(config.base + 'administration/questions/createQuestionView')
                        .success(function (data) {
                            $scope.selects = data.question_type
                            $scope.typeQuestion = data.question_type[0].id;
                            $timeout(function () {
                                jQuery('.selectpicker').selectpicker();
                            })
                        })
            }
            $scope.init();
            $scope.addMoreAnswer = function(){
                switch($scope.typeQuestion){
                    case "2":
                        jQuery('.type-question').append('<div><input type="radio"/><input placeholder="type here" class="question-answer" type="text" style="border: 0"/></div>')
                        jQuery('.type-question input:last-child').focus()
                        break;
                    default:
                        jQuery('.type-question').append('<div style="margin-bottom: 10px;"><input type="text" class="label-answer question-answer" placeholder="label" style="border: 0; width: 90px"/><input type="text"/></div>')
                        jQuery('.type-question div:last-child .label-answer').focus()
                        break;
                }
            }
            
            $scope.activeTab = function (tab) {
                jQuery('.tab-pane').removeClass('active')
                jQuery('#' + tab).addClass('active')
            }
            
            $scope.save = function(){
                var data = {};
                //get question
                data['question-en'] = CKEDITOR.instances['question-en'].getData()
                data['question-vn'] = CKEDITOR.instances['question-vn'].getData()
                data['question-ch'] = CKEDITOR.instances['question-ch'].getData()
                
                //get answer
                var languages = ['en','vn','ch']
                languages.forEach(function(language){
                    jQuery('.answer-' + language + ' .question-answer').each(function(){
                        if(data['answer-' + language])
                            data['answer-' + language].push(this.value);
                        else
                            data['answer-' + language] = new Array(this.value)
                    })
                })
                data['question-type'] = $scope.typeQuestion
                
                $http.post(config.base + 'administration/questions/addNewQuestion',data)
                        .success(function(result){
                            console.log(result)
                        })
            }
        }])




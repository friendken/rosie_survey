angular.module('survey.controllers', ['ui.bootstrap'])
    .run(function ($rootScope) {
        $rootScope.modeQuestion = 1
        $rootScope.pagination = 1
        var cname = 'language',
            name = cname + "=",
            ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ')
                c = c.substring(1);
            if (c.indexOf(name) == 0)
                $rootScope.language = c.substring(name.length, c.length);
        }
    })
    .controller('profileController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        if ($rootScope.language)
            $scope.profileLanguage = $rootScope.language
        else
            $scope.profileLanguage = 'en'

    }])
    .controller('contactController', ['$scope', '$http', function ($scope, $http) {
        $scope.sendMessage = function () {
            $http.post(config.base + '/survey/contact/sendMessage', $scope.contact).success(function (result) {
                alert('your message have been sent')
                $scope.contact.name = ''
                $scope.contact.email = ''
                $scope.contact.message = ''
            })

        }
    }])
    .controller('menuController', ['$scope', '$location', 'language', '$rootScope', function ($scope, $location, language, $rootScope) {
        var path = $location.path()

        $('#bs-example-navbar-collapse-1 li').removeClass('active')
        switch (path) {
            case "/contact":
                $('#bs-example-navbar-collapse-1 .contact').addClass('active')
                break
            case "/survey":
            case "/start-survey":
                $('#bs-example-navbar-collapse-1 .survey').addClass('active')
                break
            default:
                $('#bs-example-navbar-collapse-1 .profile').addClass('active')
                break
        }

        $scope.selectMenu = function ($event) {
            $('#bs-example-navbar-collapse-1 li').removeClass('active')
            $($event.currentTarget).addClass('active')
            var path = $($event.currentTarget).find('a').attr('href').substr(1)
            $location.path(path)
        }
        $scope.initLanguage = function () {
            if ($rootScope.language)
                var languageCode = $rootScope.language
            else
                var languageCode = 'en'
            language.getLanguage(function (resp) {
                $scope.menu1 = resp[languageCode].menu[0]
                $scope.menu2 = resp[languageCode].menu[1]
                $scope.menu3 = resp[languageCode].menu[2]
            })
        }
        $scope.initLanguage();

    }])
    .controller('selectboxController', [function ($timeout) {

    }])
    .controller('surveyController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        if ($rootScope.language)
            $scope.surveyLanguage = $rootScope.language
        else
            $scope.surveyLanguage = 'en'
    }])
    .controller('chooseModeController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
        if ($rootScope.language)
            $scope.stockLanguage = $rootScope.language
        else
            $scope.stockLanguage = 'en'

        $scope.chooseMode = function (mode) {
            $rootScope.modeQuestion = mode
            $rootScope.pagination = 1
            $location.path('start-survey')
        }
    }])
    .controller('startSurveyController', ['$scope', '$rootScope', '$question', '$http', function ($scope, $rootScope, $question, $http) {
        $rootScope.language ? $scope.languate = $rootScope.language : $scope.language = 'en'

        $scope.nextBtn = 0
        $scope.resultAnswer = []
        $http.get(config.base + '/survey/survey/getNumOfPage/' + $rootScope.modeQuestion).success(function (result) {
            $scope.lastPage = result
        })
        $scope.init = function (page) {
            $question.getQuestion($rootScope.modeQuestion, page, function (data) {
                if (data.status == 'error') {
                    $scope.nextBtn = false;
                    return false
                }
                else {
                    if ($rootScope.pagination == $scope.lastPage)
                        $scope.nextBtn = 1
                    $scope.questions = data
                }
            })
        }
        $scope.init($rootScope.pagination)
        $scope.loadNextPage = function () {
            $scope.saveData()
            $scope.saveAnswer()
//              $("html, body").animate({scrollTop: 350}, "slow");
//              $rootScope.pagination = $rootScope.pagination + 1;
//              $scope.init($rootScope.pagination)
        }
        $scope.saveAnswer = function () {
            $http.post(config.base + '/survey/survey/saveAnswer', $scope.resultAnswer).success(function (data) {
                console.log(data)
            })
        }

        $scope.progressBar = function(el){

            $scope.progress_custom = 'progressBar_' + el;

        }
        $scope.saveData = function () {
            $('.answer_survey').each(function () {
                var type = $(this).data('type')
                switch (type) {
                    case 1:
                        var result = $scope.saveSingle(this)
                        if (result)
                            $scope.resultAnswer.push(result)
                        break;
                    case 2:
                        $scope.saveGroup(this)
                        break;
                    case 3:
                    case 7:
                        var result = $scope.saveRadio(this)
                        if (result)
                            $scope.resultAnswer.push(result)
                        break;
                    case 4:
                        $scope.saveSpecial(this)
                        break;
                    case 5:
                        var result = $scope.saveCheckbox(this)
                        if (result)
                            $scope.resultAnswer.push(result)
                        break;
                    case 6:
                        var result = $scope.saveRadioText(this)
                        if (result)
                            $scope.resultAnswer.push(result)
                        break;
                    default:
                        break;
                }
            })
        }
        $scope.saveGroup = function (el) {
            var answer = ''
            var i = 1;
            $(el).find('textarea').each(function () {
                if (this.value && this.value.trim() != '') {
                    answer += i + '. ' + this.value + ' | '
                }
                i++
            })
            if(answer != ''){
                $scope.resultAnswer.push({
                    question_id: $(el).data('id'),
                    value: answer.substring(0, answer.length - 3)
                })
            }
        }
        $scope.saveSpecial = function (el) {
            var answer = ''
            $(el).find('[type=radio]:checked').each(function () {
                if ($(this).val() && $(this).val().trim() != '') {
                    answer += $(this).attr('name').substr(16) + '.' + $(this).val() + ' | '
                }
            })
            if (answer != ''){
                $scope.resultAnswer.push({
                    question_id: $(el).data('id'),
                    value: answer.substring(0, answer.length - 3)
                })
            }

            console.log($scope.resultAnswer)
        }
        $scope.saveRadioText = function (el) {
            var id = $(el).data('id'),
                answer = $(el).find('[name=answer_' + id + ']:checked').val(),
                position = $(el).find('[type=radio]').index($(el).find('[name=answer_' + id + ']:checked'))
            if (position == ($(el).find('[type=radio]').length - 1))
                answer = $(el).find('textarea').val()
            if (answer && answer.trim() != '') {
                return {
                    question_id: id,
                    value: answer
                }
            }
        }
        $scope.saveSingle = function (el) {
            var id = $(el).data('id')
            var answer = $(el).find('textarea').val()
            if (answer && answer.trim() != '') {
                return {
                    question_id: id,
                    value: answer
                }
            }
        }
        $scope.saveCheckbox = function (el) {
            var id = $(el).data('id')
            var answer = $(el).find('[name=answer_' + id + ']:checked').map(function () {
                return this.value
            }).get()
            if (answer && answer.length != 0) {
                return {
                    question_id: id,
                    value: answer.join(' | ')
                }
            }
        }
        $scope.saveRadio = function (el) {
            var id = $(el).data('id')
            var answer = $(el).find('[name=answer_' + id + ']:checked').val()
            if (answer && answer.trim() != '') {
                return {
                    question_id: id,
                    value: answer
                }
            }
        }
    }])






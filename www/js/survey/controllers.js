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
    .controller('thankYouController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        $rootScope.language ?$scope.Language = $rootScope.language:$scope.Language = 'en'

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
    .controller('startSurveyController',
        ['$scope', '$rootScope', '$question', '$http', '$location','$timeout',
            function ($scope, $rootScope, $question, $http, $location, $timeout) {
        $rootScope.language ? $scope.languate = $rootScope.language : $scope.language = 'en'
        $scope.alert = []
        $scope.alert['en'] = 'please answer all the questions to proceed to next page'
        $scope.alert['vn'] = 'vui lòng trả lời hết câu hỏi'
        $scope.alert['ch'] = '请回答所有问题'
        $scope.nextBtn = 0
        $scope.breakPage = 0
        $scope.resultAnswer = []
        $scope.progress_custom = 'progressBar_1'
        $scope.answer_id = ''
        $scope.processPage = []

        //$rootScope.modeQuestion = 3;
        $http.get(config.base + 'survey/survey/getNumOfPage/' + $rootScope.modeQuestion).success(function (result) {
            $scope.lastPage = result
            for(var i = 1; i <= $scope.lastPage;i++){
                $scope.processPage.push(i);
            }
        })
        $scope.init = function (page) {
            if(page == 5){
                if(!confirm('Thank you so much for your time. The survey has been half-completed. Would you like to continue the survey?')){
                    $scope.breakPage = 1;
                    $location.path('thank-you')
                }
            }
            $question.getQuestion($rootScope.modeQuestion, page, function (data) {
                if (data.status == 'error') {
                    $scope.nextBtn = false;
                    return false
                }
                else {
                    if ($rootScope.pagination == $scope.lastPage)
                        $scope.nextBtn = 1
                    $scope.questions = data
                    $scope.renderPagination(page)
                }
            })
        }
        $scope.$on('$locationChangeStart', function( event ) {
            if($scope.nextBtn != 1 && $scope.breakPage != 1){
                var answer = confirm("The survey has not been completed. Are you sure you want to stop the survey and leave this page?")
                if (!answer) {
                    event.preventDefault();
                }
            }
        });
        $scope.init($rootScope.pagination)
        $scope.renderPagination = function (page){
            $('.number').removeClass('done')
            $('.number').removeClass('active')
            $('.number').removeClass('next')
            $('.pagination-' + page).addClass('active')
            $('.pagination-' + page).next().addClass('next')
            for(var i = 1; i < page;i++){
                $('.pagination-' + i).addClass('done')
            }
        }
        $scope.loadNextPage = function () {
            $scope.saveData()
            var check = 0;
            $scope.resultAnswer.forEach(function (item) {
                if (item.value == '')
                    check++;
            })
            //if (check != 0) {
            //    alert($scope.alert[$scope.language])
            //    $scope.resultAnswer = []
            //    return false;
            //}
            $scope.saveAnswer()
            $("html, body").animate({scrollTop: 350}, "slow");
            $rootScope.pagination = $rootScope.pagination + 1;
            $scope.init($rootScope.pagination)
        }
        $scope.sendResult = function(){
            $scope.saveData()
            var check = 0;
            $scope.resultAnswer.forEach(function (item) {
                if (item.value == '')
                    check++;
            })
            //if (check != 0) {
            //    alert($scope.alert[$scope.language])
            //    $scope.resultAnswer = []
            //    return false;
            //}
            $scope.saveAnswer()
            $location.path('thank-you')
        }
        $scope.saveAnswer = function () {
            if ($scope.answer_id != '')
                var url = config.base + '/survey/survey/saveAnswer/' + $scope.answer_id
            else
                var url = config.base + '/survey/survey/saveAnswer'
            console.log($scope.resultAnswer)
            $http.post(url, {results: $scope.resultAnswer,question_mode: $rootScope.modeQuestion}).success(function (data) {
                $scope.answer_id = data.answer_id
                $scope.resultAnswer = []
            })
        }
        $scope.progressBar = function(key,el){
            $scope.progress_custom = 'abc_1 progressBar_' + key;
            $(el).closest('div').removeClass()
            var current = $(el).closest('div');
            var current_parent = $(el).closest('div.answer_survey')
            var count_all = $(el).closest('div');
            var id_progress = count_all.attr('id') 
            count_all = count_all.find('span.list-checkbox').length;
            var percent = ((key/count_all)*100)+'%'
            if($('#'+id_progress).find('.custom_progess').length >= 1){
              $('#'+id_progress).find('.custom_progess').remove()
             current.append('<div class="custom_progess" style="width:'+percent +'"></div>')
            }else{
             current.append('<div class="custom_progess" style="width:'+percent +'"></div>')
            }
            $(el).closest('div').addClass($scope.progress_custom);
            $('.checkobox_progress').css('width','100%')



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
                    case 8:
                        var result = $scope.saveCheckboxText(this)
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

            $scope.resultAnswer.push({
                question_id: $(el).data('id'),
                value: answer.substring(0, answer.length - 3)
            })

        }
        $scope.saveSpecial = function (el) {
            var answer = ''
            if($(el).find('[type=radio]').length > 0){
                $(el).find('[type=radio]:checked').each(function () {
                    if ($(this).val() && $(this).val().trim() != '') {
                        var nameAnswer = $(this).attr('name').split('_') //change name of checkbox to array then get the id answer
                        answer += nameAnswer[3] + '.' + $(this).val() + ' | '
                    }
                })

                $scope.resultAnswer.push({
                    question_id: $(el).data('id'),
                    value: answer.substring(0, answer.length - 3)
                })
            }else{
                $(el).find('tbody tr').each(function(){
                    if($(this).find('input').val() != '')
                        answer +=  $(this).find('input').val() + ' - ' + $(this).find('select').val() + ' | '
                })
                $scope.resultAnswer.push({
                    question_id: $(el).data('id'),
                    value: answer.substring(0, answer.length - 3)
                })
            }
        }
        $scope.saveRadioText = function (el) {
            var id = $(el).data('id'),
                answer = $(el).find('[name=answer_' + id + ']:checked').val(),
                position = $(el).find('[type=radio]').index($(el).find('[name=answer_' + id + ']:checked'))
            if (position == ($(el).find('[type=radio]').length - 1))
                answer = $(el).find('textarea').val()

            if (!answer)
                answer = ''

            return {
                question_id: id,
                value: answer
            }
        }
        $scope.saveCheckboxText = function (el) {
            var id = $(el).data('id')
            var quantity = $(el).find('[name=answer_' + id + ']').length
            var answer = $(el).find('[name=answer_' + id + ']:checked').map(function (index,item) {
                    if(quantity == this.value)
                        return $(this).parents('.answer_survey').find('textarea').val()
                    return this.value
                }).get()

            if (!answer)
                answer = ''
            console.log(answer)
            return {
                question_id: id,
                value: answer
            }

        }
        $scope.saveSingle = function (el) {
            var id = $(el).data('id')
            var answer = $(el).find('textarea').val()
            if (!answer)
                answer = ''

            return {
                question_id: id,
                value: answer
            }
        }
        $scope.saveCheckbox = function (el) {
            var id = $(el).data('id')
            var answer = $(el).find('[name=answer_' + id + ']:checked').map(function () {
                return this.value
            }).get()

            return {
                question_id: id,
                value: answer.join(' | ')
            }
        }
        $scope.saveRadio = function (el) {
            var id = $(el).data('id')
            var answer = $(el).find('[name=answer_' + id + ']:checked').val()
            if (!answer)
                answer = ''

            return {
                question_id: id,
                value: answer
            }

        }
    }])






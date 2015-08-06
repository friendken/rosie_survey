var order = 1;
var language;
angular.module('survey.filters',[])
    .filter('renderQuestion',function($sce,$rootScope){
        return function(question){
            if(question){
                var html = ''
                $rootScope.modeQuestion == 1 ? order = 'paginated1_order': order = 'paginated2_order'
                $rootScope.language ? language = $rootScope.language : language = 'en'
                switch (question.question_type){
                    case "1":
                        html += renderSingleQuestion(question)
                        break
                    case "2":
                        html += renderGroupQuestion(question)
                        break
                    case "3":
                        html += renderRadioQuestion(question)
                        break
                    case "4":
                        html += renderSpecialQuestion(question,$sce)
                        break
                    case "5":
                        html += renderCheckboxQuestion(question)
                        break
                    case "6":
                        html += renderRadioTextQuestion(question)
                        break
                    case "7":
                        html += renderScaleQuestion(question)
                        break
                    case "8":
                        html += renderCheckBoxTextQuestion(question)
                        break
                    case "9":
                        html += renderText(question)
                        break
                }
                return $sce.trustAsHtml(html)
            }
        }
    })

renderSingleQuestion = function(question){
    var html = "<span class='header-question-number' style='float: left'>" + question[order] + ".&nbsp</span>" + "<div class='header-question option-question-1'>" + question[language] + "</div>"
    html += '<div class="answer_survey" data-id="' + question.id + '" data-type="' + question.question_type + '">'
    html += "<textarea class='textarea-anwser'></textarea></div>"
    return html
}
renderText = function(question){
    var html = "<span class='header-question-number' style='float: left'></span>" + "<div class='header-question option-question-1'>" + question[language] + "</div>"
    return html
}
renderRadioQuestion = function(question){
    var html = "<span class='header-question-number' style='float: left'>" + question[order] + ".&nbsp</span>" + "<div class='header-question option-question-1'>" + question[language] + "</div>"
    html += '<div class="answer_survey" data-id="' + question.id + '" data-type="' + question.question_type + '"><ul class="single-quetion-ul" style="list-style-type: none;">'

    if(question.question_detail[language]){
        question.question_detail[language].forEach(function(item,key){
            html += '<li><input type="radio" value="' + (key + 1) + '" id="answer_'+ question.id +'_'+ (key + 1) +'" name="answer_' + question.id + '"/><label for="answer_' + question.id + '_'+ (key + 1)+'"><span>&nbsp&nbsp' + item.value + '</span></label></li>'
        })
    }
    html += '</ul></div>'
    return html
}
renderScaleQuestion = function(question){
    var html = "<span  class='header-question-number' style='float: left'>" + question[order] + ".&nbsp</span>" + "<div class='header-question option-question-3'> " + question[language] + "</div>"
    html += '<div class="answer_survey" data-id="' + question.id + '" data-type="' + question.question_type + '">'
    $.each(question.question_detail[language],function(key,value){
        var data_custom_start ='',data_custom_end ='',data_custom_start_div ='',data_custom_end_div ='';

	    var count = question.question_detail[language].length;
	    var showNumber = value.value
        if (key == 0){
            var firtsScale = value.value.split(':')
            data_custom_start = '<span class="start-answer">' + firtsScale[1].trim() + '</span>';
            data_custom_start_div ='<div class="abc_1" id="pro_'+question.id+'"'+'ng-Class="progress_custom">'
            showNumber = 1
            //value.value = '1'
        }
        else if (key == (count-1)){
            var lastScale = value.value.split(':')
            data_custom_end = '<span class="start-end">' + lastScale[1].trim() + '</span>';
            data_custom_end_div ="</div>"
            showNumber = count
            //value.value = count
        }

        html += data_custom_start + data_custom_start_div+ '<span class="list-checkbox"><input type="radio"  id="answer_'+ question.id +'_'+(key + 1)+'" name="answer_' + question.id + '" value="' + (key + 1) + '"><label onclick="angular.element(this).scope().progressBar('+(key + 1)+',this)" for="answer_' + question.id + '_'+ (key + 1)+'"><span>' + showNumber + '</span></label></span>'+data_custom_end_div + data_custom_end
    })
    html += '</div>'
    return html
}
renderGroupQuestion = function(question){
    var html = "<span class='header-question-number' style='float: left'>" + question[order] + ".&nbsp</span>" + "<div class='header-question option-question-4'>" + question[language] + "</div>"
    html += '<div class="answer_survey answer_survey_ol" data-id="' + question.id + '" data-type="' + question.question_type + '"><ol type="a" style="padding: 0 !important">'
    $.each(question.question_detail[language],function(key, answer){
        html += '<li><div>' + answer.value + '</div><div><textarea data-sub-id="' + answer.question_detail_id + '" class="textarea-anwser"></textarea></div></li>'
    })
    html += '</ol></div>'
    return html
}
renderRadioTextQuestion = function(question){
    var html = "<span class='header-question-number' style='float: left'>" + question[order] + ".&nbsp</span>" + "<div class='header-question option-question-5'>" + question[language] + "</div>"
    html += '<div class="answer_survey answer_survey_ul question_other" data-id="' + question.id + '" data-type="' + question.question_type + '"><ul style="list-style-type: none; padding: 0 !important">'

    if(question.question_detail[language]){
        question.question_detail[language].forEach(function(item,key){
            html += '<li><input type="radio" value="' + (key + 1) + '" id="answer_' + question.id+ '_'+(key + 1)+'" name="answer_' + question.id + '"/><label for="answer_' + question.id + '_'+(key + 1)+'"><span>&nbsp&nbsp' + item.value + '</span></label></li>'
        })
    }
    html += '</ul><div"><textarea class="textarea-anwser"></textarea></div></div>'
    return html
}
renderCheckBoxTextQuestion = function(question){
    var html = "<span class='header-question-number' style='float: left'>" + question[order] + ".&nbsp</span>" + "<div class='header-question option-question-5'>" + question[language] + "</div>"
    html += '<div class="answer_survey answer_survey_ul question_other" data-id="' + question.id + '" data-type="' + question.question_type + '"><ul style="list-style-type: none; padding: 0 !important">'

    if(question.question_detail[language]){
        question.question_detail[language].forEach(function(item,key){
            html += '<li><input type="checkbox" value="' + (key + 1) + '" id="answer_' + question.id+ '_'+(key + 1)+'" name="answer_' + question.id + '"/><label for="answer_' + question.id + '_'+(key + 1)+'"><span>&nbsp&nbsp' + item.value + '</span></label></li>'
        })
    }
    html += '</ul><div"><textarea class="textarea-anwser"></textarea></div></div>'
    return html
}
renderCheckboxQuestion = function(question){
    var html = "<span class='header-question-number' style='float: left'>" + question[order] + ".&nbsp</span>" + "<div class='header-question option-question-6'>" + question[language] + "</div>"
    html += '<div class="answer_survey answer_survey_ul" data-id="' + question.id + '" data-type="' + question.question_type + '"><ul style="list-style-type: none; padding: 0 !important;">'

    if(question.question_detail[language]){
        question.question_detail[language].forEach(function(item,key){
           html += '<li><input type="checkbox" value="' + (key + 1) + '" id="answer_' + question.id+ '_'+(key + 1) +'" name="answer_' + question.id + '"/><label for="answer_' + question.id + '_' +( key + 1 )+ '"><span>&nbsp&nbsp' + item.value + '</span></label></li>'
        })
    }
    html += '</ul></div>'
    return html
}

renderSpecialQuestion = function(question,$sce){
    var html = "<div class='answer_survey' data-id='" + question.id + "' data-type='" + question.question_type + "'><span class='header-question-number option-question-7' style='float:left;'>" + question[order] + ".&nbsp</span> " + question[language] + "</div>"
    $html = $(html)
    countRadio = ($html.find('[type=radio]').length)/2
    for(var i = 1; i <= countRadio;i++){
        $html.find('[name=answer_checkbox_' + i +']').prop('name','answer_checkbox_' + question.id + '_' + i)
    }
    html = $html.prop('outerHTML')
    return html

}
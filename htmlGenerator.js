documents_as_json = {
    10000000000000000000000000000000:{
        'OUID':10000000000000000000000000000000,
        'title':"",
        'documents':{
            10000000000000000000000000000001:{
                'OUID':10000000000000000000000000000000,
                'title':'',
                'tag':{},
                'cover':'',
                'deadline':'',
                'performers':{},
                'is_perhormers':''
            }
        }
    },
    10000000000000000000000000000002:{
        'OUID':10000000000000000000000000000002,
        'title':"",
        'documents':{}
    },
    10000000000000000000000000000003:{
        'OUID':10000000000000000000000000000003,
        'title':"",
        'documents':{}
    },
}


var list_wrapper = $('<div class = "list-wrapper" />')
var list_header = $('<div class = "list-header"><h2 class="js-list-header-title" /></div>')
var list_cards = $('<div class = "list-cards js-list-cards"></div>')
var list = $('<div class = "list" />')
var emptyListElement =list_wrapper.append(list.append([list_header,list_cards]))

var list_card = $('<a  class="list-card" />')
var list_cover = $('<a  class="list-card-cover js-card-cover is-covered" />')
var list_card_detail = $('<div class="list-card-detail" />')
var emptyCard = list_card.append([list_cover,list_card_detail])

var list_card_labels = $('<div class="list-card-labels js-card-labels">')
var list_card_label = $('<span class="card-label mod-card-front" title=""><span class="label-text">&nbsp;</span></span>') // add card-label-* , * - green, yellow

var list_card_title = $('<span class="list-card-title"></span>')

var badges = $('<div class = "badges"><span class="js-badges">')
var badge = $('<div class = "badge" />')
var badge_icon = $('<div class = "badge-icon" />')
var badge_text = $('<div class = "badge-text" />')

var list_card_members = $('<div class="list-card-members js-list-card-members" />')
var member = $('<div class="member js-member-on-card-menu" />')
var member_initials = $('<span class="member-initials" />')

function getEmptyListElement(title=""){
    var _emptyListElement = emptyListElement
    return _emptyListElement.find('.js-list-header-title').text(title)
}

function _calculateStyleCover(){

}

function getEmptyListCard(){
    var _emptyCard = emptyCard
    var calculateStyle = calculateStyleCover()
    return _emptyCard.find('.js-card-cover').style(calculateStyle)
}

function getEmptyListCardLabels(labels){
    var _listCardLabels = list_card_labels
    for (label in labels){
        _listCardLabels.append(getEmptyLabel(label))
    }
    return _listCardLabels
}

function _getEmptyLabel(label){
    var _listCardlabel = list_card_label
    return _listCardlabel.addClass(label.className)
}

function getEmptyBadgets(badgets){
    _emptyBadgets = badges
    for (badget in badgets){
        _emptyBadgets.appned(getEmptyBadget(badget))
    }
}

function _getEmptyBadget(badget){
    _emptyBadget = badge
    for (badgetType in badget){
        var _badgeIicon = badge_icon
        var _badgeIText = badgeText
        // badgetType - key in dictionary
        if (badgetType == 'icon'){
            _badgeIicon.addClass(badget[badgetType])
            _emptyBadget.appned(_badgeIicon)
        }
        if (badgetType == 'text'){
            _badgeText.addClass(badget[badgetType])
            _emptyBadget.appned(_badgeIText)
        }
    }
    return _emptyBadget
}

function getEmptyListCardMembers(members){
    _emptyListCardMembers = list_card_members
    for (member in members){
        _emptyListCardMembers.append(getEmptyMember(member_obj))
    }
    return  _emptyListCardMembers
}

function _getEmptyMember(member_obj){
    _member = member
    _member_initials = member_initials
    _member_initials.text(member_obj.name)
    return  _member.append(_member_initials)

}

creatorElementFunction = {
    'list':getEmptyListElement,
    'card':'',
    'badgets':'',
    'labels':'',
    'members':'',
}

function createElementWalker(documents_as_json){
    for (_document in documents_as_json){
        var newleaf = documents_as_json[_document]
        console.log(_document)
        console.log(newleaf)
        if ((typeof newleaf) == 'object'){
            console.log('object')
            createElementWalker(newleaf)
        }
    }
}
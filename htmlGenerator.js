documents_as_json = {
	lists: {
        1:{
            id:'1',
            title:'List 1',
            cards:{
                10:{
                    title:"Card 10",
                    labels:{
                        1:{
                            className:'card-label-green'
                        },
                        2:{
                            className:'card-label-yellow'
                        }
                    },
                    badges:{
                        date:''
                    }
                },
                11:{
                    title:"Card 11",
                },
                12:{
                    title:"Card 12",
                }
            }
        },
        2:{
            id:'2',
            title:"List 2",
            cards:{
                20:{
                    title:"Card 20",
                },
                21:{
                    title:"Card 21",
                },
            }
        },
        3:{
            id:'3',
            title:"List 3",
            cards:{
                30:{
                    title:"Card 30",
                },
                31:{
                    title:"Card 31",
                },
            }
        }

    }
};

var list_wrapper = $('<div class = "list-wrapper" />');
var list_header = $('<div class = "list-header"><h2 class="js-list-header-title" /></div>');
var list_cards = $('<div class = "list-cards js-list-cards"></div>');
var list = $('<div class = "list" />');
var emptyListElement = list_wrapper.append(list.append([ list_header, list_cards ]));

var list_card = $('<a  class="list-card" />');
var list_cover = $('<a  class="list-card-cover js-card-cover is-covered" />');
var list_card_detail = $('<div class="list-card-detail"><div class="list-card-labels js-card-labels"></div>');
var emptyCard = list_card.append([ list_cover, list_card_detail ]);


var list_card_labels = $('<div class="list-card-labels js-card-labels">');
var list_card_label = $(
	'<span class="card-label mod-card-front" title=""><span class="label-text">&nbsp;</span></span>'
); // add card-label-* , * - green, yellow

var list_card_title = $('<span class="list-card-title"></span>');

var badges = $('<div class = "badges"><span class="js-badges">');
var badge = $('<div class = "badge" />');
var badge_icon = $('<div class = "badge-icon" />');
var badge_text = $('<div class = "badge-text" />');

var list_card_members = $('<div class="list-card-members js-list-card-members" />');
var member = $('<div class="member js-member-on-card-menu" />');
var member_initials = $('<span class="member-initials" />');

function getEmptyListElement(container_element) {
    var _emptyListElement = emptyListElement.clone(true,true);
    console.log(container_element)
    _emptyListElement.appendTo(container_element)
    console.log('Added EmptyListElement!')
	return _emptyListElement
}

function setListTitle(container_element,title){
    container_element.find('.js-list-header-title').text(title);
}

function _calculateStyleCover() {
    return {}
}

function getEmptyListCard(container_element) {
	var _emptyCard = emptyCard.clone(true,true);
	var calculateStyleCover = _calculateStyleCover();
    _emptyCard.find('.js-card-cover').css(calculateStyleCover);
    _emptyCard.appendTo(container_element.find('.js-list-cards'))
    return _emptyCard
}

function getEmptyListCardLabel(container_element) {
	var _listCardLabel = list_card_labels.clone(true,true);
    _listCardLabel.appendTo(container_element.find('.js-card-labels'))
	return _listCardLabel;
}

function setEmptyLabel(container_element) {
	var _listCardlabel = list_card_label.clone(true,true);
	return _listCardlabel.addClass(label.className);
}

function setCardTitle(container_element,title){
    _list_card_title = list_card_title.clone(true,true)
    _list_card_title.text(title)
    container_element.find('.list-card-detail').append(_list_card_title)
}

function getEmptyBadgets(badgets) {
	_emptyBadgets = badges;
	for (badget in badgets) {
		_emptyBadgets.appned(getEmptyBadget(badget));
	}
}

function _getEmptyBadget(badget) {
	_emptyBadget = badge;
	for (badgetType in badget) {
		var _badgeIicon = badge_icon;
		var _badgeIText = badgeText;
		// badgetType - key in dictionary
		if (badgetType == 'icon') {
			_badgeIicon.addClass(badget[badgetType]);
			_emptyBadget.appned(_badgeIicon);
		}
		if (badgetType == 'text') {
			_badgeText.addClass(badget[badgetType]);
			_emptyBadget.appned(_badgeIText);
		}
	}
	return _emptyBadget;
}

function getEmptyListCardMembers(members) {
	_emptyListCardMembers = list_card_members;
	for (member in members) {
		_emptyListCardMembers.append(getEmptyMember(member_obj));
	}
	return _emptyListCardMembers;
}

function _getEmptyMember(member_obj) {
	_member = member;
	_member_initials = member_initials;
	_member_initials.text(member_obj.name);
	return _member.append(_member_initials);
}

function setId(element,id){
    console.log('set id : ' + id)
    element.attr('id',id)
}
function setLabelClassName(element,className){
    element.attr('class','card-label '+className+' mod-card-front')
    // card-label card-label-green mod-card-front
}

creatorElementFunction = {
    lists: getEmptyListElement,
	cards: getEmptyListCard,
	badgets: getEmptyBadgets,
	labels: getEmptyListCardLabel,
	members: getEmptyListCardMembers
};

changerElementFunction = {
    lists_id:setId,
    lists_title:setListTitle,
    cards_id:setId,
    cards_title:setCardTitle,
    labels_className:setLabelClassName
}


// if obj has property, which has value as obj, then obj key is ID

function createElementWalker(documents_as_json, container_name = null, container_element = null) {
    var _documents_as_json = documents_as_json
    var current_container_name = container_name
    var current_container_element = container_element

    for (key in _documents_as_json){
        var leaf_value = _documents_as_json[key]
        if (typeof leaf_value == 'object' ){
            if (key in creatorElementFunction){
                var n = key
                var e = container_element
            }else{
                var n = current_container_name
                var e = creatorElementFunction[current_container_name](current_container_element)
            }
            createElementWalker(documents_as_json = leaf_value, container_name = n, container_element = e)
        }else{
            console.log('Property: ' + current_container_name +'_'+key)
            var func_as_key = container_name+'_'+key
            if (func_as_key in changerElementFunction){
                changerElementFunction[func_as_key](current_container_element,leaf_value)
            }
        }
    }
}

$( function() {
    createElementWalker(documents_as_json,container_name='board',container_element = $('.board'))
})


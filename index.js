$( function() {
    $( ".board" ).sortable({
      placeholder: "placeholder-list",
      forcePlaceholderSize: true,
      revert: true,
      zIndex: 10000,
      sort: function (event, ui) {
        // Source: https://stackoverflow.com/questions/10637095/jquery-ui-sortable-tolerance-option-not-working-as-expected/10699339
        var that = $(this),
            w = ui.helper.outerWidth();
        that.children().each(function () {
            if ($(this).hasClass('ui-sortable-helper') || $(this).hasClass('ui-sortable-placeholder')) 
                return true;
            // If overlap is more than half of the dragged item
            var dist = Math.abs(ui.position.left - $(this).position().left),
                before = ui.position.left > $(this).position().left;
            if ((w - dist) > (w / 2) && (dist < w)) {
                if (before)
                    $('.ui-sortable-placeholder', that).insertBefore($(this));
                else
                    $('.ui-sortable-placeholder', that).insertAfter($(this));
                return false;
            }
        });
    },
    }).disableSelection();

    $( ".list-cards" ).sortable({
      appendTo: document.body,
      connectWith: ".js-list-cards",
      // items:".list-card",
      placeholder: "placeholder-card",
      forceHelperSize:true,
      forcePlaceholderSize: true,
      revert: true,
      dropOnEmpty: true,
      zIndex: 10000
    }).disableSelection();

    $( ".list-card" ).droppable().disableSelection();
  });
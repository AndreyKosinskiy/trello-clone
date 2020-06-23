$( function() {
    $( ".board" ).sortable({
      placeholder: "placeholder-list",
      handle:".list-header",
      forcePlaceholderSize: true,
      revert: 20,
      cursor: "move",
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
      connectWith: ".js-list-cards",
      placeholder: "placeholder-card",
      forceHelperSize:true,
      forcePlaceholderSize: true,
      revert: 20,
    //   zIndex: 10000
    cursor: "move",
    }).disableSelection();

    $( ".list-card" ).droppable({
        connectToSortable:"list-cards"
    }).disableSelection();

    console.log("refresh Begin")
    $( ".list-cards" ).sortable( "refresh" );
    console.log("refresh End")
  });
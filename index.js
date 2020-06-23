$( function() {
    $( ".board" ).sortable({
      // connectWith: ".board",
      placeholder: "placeholder-list",
      forceHelperSize: true,
      forcePlaceholderSize: true,
      revert: true,
      tolerance: "pointer",
      sort: function (event, ui) {
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
      // connectWith: ".board",
      placeholder: "placeholder-card",
      forceHelperSize: true,
      forcePlaceholderSize: true,
      revert: true,
      refreshPositions:true
    }).disableSelection();

    $( ".list-card" ).droppable({
      accept: ".list-cards",
      greedy: true
    });
    


  //   $( ".list-wrapper" ).draggable({
  //       connectToSortable: ".board",
  //       helper:'original',
  //       cursor: "pointer",
  //       refreshPositions: true,
  //     }).disableSelection();

  });
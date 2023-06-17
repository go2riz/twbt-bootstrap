(function($) {
  var original_show = $.fn.typeahead.Constructor.prototype.show;

  $.fn.typeahead.Constructor.prototype.show = function() {
    this.$element.parent().css({ position: 'relative' });
    return original_show.apply(this, arguments);
  };
})(jQuery);
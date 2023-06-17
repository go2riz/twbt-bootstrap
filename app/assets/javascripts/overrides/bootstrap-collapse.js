// The default bootstrap-collapse only adds 'collapsed' class to toggle when it is clicked directly
// However, we want to add 'collapsed' class also when it is closed indirectly by hitting another toggle
(function($) {
  var original_show = $.fn.collapse.Constructor.prototype.show;
  var original_hide = $.fn.collapse.Constructor.prototype.hide;

  // find the accordion toggle for the current element
  function find_accordion_toggle($parent, $element) {
    if ($parent && $element) {
      var href_selector = '.accordion-toggle[href=#' + $element.attr('id') + ']';
      var target_selector = '.accordion-toggle[data-target=#' + $element.attr('id') + ']';
      return $parent.find(href_selector + ', ' + target_selector);
    }
  }

  // determine if anything is transitioning
  function is_anything_transitioning($parent, $element) {
    var actives = $parent && $parent.find('> .accordion-group > .in');

    var results = [actives, $element].map(function($collapse_element) {
      var collapse = $collapse_element && $collapse_element.data('collapse')

      return (collapse && collapse.transitioning) ? true : false;
    });
    return results.indexOf(true) > -1;
  }

  $.fn.collapse.Constructor.prototype.show = function() {
    var accordion_toggle = find_accordion_toggle(this.$parent, this.$element);

    if (accordion_toggle) {
      if (!is_anything_transitioning(this.$parent, this.$element)) {
        // remove 'collapsed' class to the accordion-toggle if nothing is transitioning
        accordion_toggle.removeClass('collapsed');
      } else {
        // otherwise, make sure nothing else is active besides the current element
        accordion_toggle.addClass('collapsed');
      }
    }

    return original_show.apply(this, arguments);
  }

  $.fn.collapse.Constructor.prototype.hide = function() {
    var accordion_toggle = find_accordion_toggle(this.$parent, this.$element);

    if (accordion_toggle) {
      if (!is_anything_transitioning(this.$parent, this.$element)) {
        // add 'collapsed' class to the accordion-toggle if nothing is transitioning
        accordion_toggle.addClass('collapsed');
      } else {
        // otherwise, make sure nothing else is collapsed besides the current element
        accordion_toggle.removeClass('collapsed');
      }
    }

    return original_hide.apply(this, arguments);
  }
})(jQuery);
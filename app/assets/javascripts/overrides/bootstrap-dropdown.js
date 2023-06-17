(function(window, $) {
  var Dropdown        = $.fn.dropdown.Constructor,
      originalToggle  = Dropdown.prototype.toggle;

  $.fn.dropdown.Constructor.prototype.toggle = function() {
    var $this          = $(this),
        $container     = $($this.attr('data-container')),
        containerWidth = 0;

    // if a container is explicitly set, set its size to match with the container
    if ($container.get(0)) {
      containerWidth = $container.width();
      if (containerWidth > 0) {
        $this.next('.dropdown-menu').css({ width: containerWidth });
      }
    }

    return originalToggle.apply(this, arguments);
  };

  $(window.document)
    .off('click.dropdown.data-api touchstart.dropdown.data-api', '[data-toggle=dropdown]')
    .on('click.dropdown.data-api touchstart.dropdown.data-api', '[data-toggle=dropdown]', Dropdown.prototype.toggle);
})(window, window.jQuery);
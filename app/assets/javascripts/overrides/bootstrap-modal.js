// The default bootstrap modal box script sets a fixed max-height
// Instead, it needs to set the height depending on window size
(function($, window) {
  // Store reference to original show function
  var originalShow  = $.fn.modal.Constructor.prototype.show,
      originalHide  = $.fn.modal.Constructor.prototype.hide,
      modals        = [];

  // Monkey-patch original function so that the height for the modal box is dynamic
  $.fn.modal.Constructor.prototype.show = function() {
    var maxHeight        = 800,
        minHeight        = 100,
        $footer          = this.$element.find('.modal-footer'),
        $body            = this.$element.find('.modal-body'),
        windowHeight     = window.innerHeight ? window.innerHeight : $(window).height(),
        windowHeightDiff = $(window).height() - windowHeight,
        offset           = 160 +
                           ($body ? $body.innerHeight() - $body.height() : 0) +
                           (windowHeightDiff > 0 && $footer.get(0) ? windowHeightDiff : 0),
        modalIndex;

    if (this.$element.parent().get(0) !== document.body) {
      // modal box needs to have the same parent as backdrop
      this.$element.appendTo(document.body);
    }

    if (this.options.height !== undefined) {
      $body.css({
        'max-height': 'none',
        'height':     this.options.height
      });
    } else {
      $body.css({
        'max-height': [minHeight, maxHeight, windowHeight - offset].sort()[1]
      });
    }

    // temporarily hide previously opened modal
    if (modals.length > 0) {
      modals[modals.length - 1].$element.hide();
      modals[modals.length - 1].$backdrop.hide();
    }

    // push to modal stack
    modalIndex = $.inArray(modals, this);
    if (modalIndex > -1) {
      modals.splice(modalIndex);
    }

    modals.push(this);

    return originalShow.apply(this, arguments);
  };

  $.fn.modal.Constructor.prototype.hide = function(event) {
    modals.pop();

    if (modals.length > 0) {
      modals[modals.length - 1].$element.show();
      modals[modals.length - 1].$backdrop.show();
    }

    var returnValue    = originalHide.apply(this, arguments),
        $currentTarget = this.$element,
        href           = $currentTarget.attr('href'),
        target         = $currentTarget.attr('target');

    // close modal and go to page if href is specified
    if ($currentTarget.prop('tagName').toLowerCase() === 'a' &&
        href !== undefined &&
        !/^#/.test(href) &&
        target === '_self') {
      window.location.href = href;
    }

    return returnValue;
  };

  // Fix the stack overflow issue where you cannot display two modal boxes at once
  $.fn.modal.Constructor.prototype.enforceFocus = function() {
    if (modals.length === 1) {
      $(document).on('focusin.modal', function (e) {
        var that = modals[modals.length-1];
        if (that && that.$element[0] !== e.target && !that.$element.has(e.target).length) {
          that.$element.focus();
        }
      });
    }
  };
})(jQuery, window);

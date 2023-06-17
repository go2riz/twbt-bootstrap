(function($) {
  var original_init = $.fn.popover.Constructor.prototype.init,
      original_show = $.fn.tooltip.Constructor.prototype.show,
      popovers      = [];

  $.fn.popover.Constructor.prototype.init = function() {
    var returnValue = original_init.apply(this, arguments),
        _this       = this;

    // if the trigger is 'click', close the tip when clicking elsewhere
    if (this.options.trigger === 'click') {
      $(document).on('click', function(event) {
        var $tip = _this.tip();

        if ($.contains(event.target, $tip.get(0))) {
          _this.hide();
        }
      });
    }

    popovers.push(this);

    return returnValue;
  };

  // make sure tooltip stays within viewport
  $.fn.popover.Constructor.prototype.show = function() {
    var _this           = this,
        returnValue     = original_show.apply(this, arguments),
        $tip            = this.tip(),
        $tipArrow       = $tip.find('.arrow'),
        position        = $tip.offset(),
        elementPosition = this.$element.offset(),
        outerWidth      = $tip.outerWidth(),
        outerHeight     = $tip.outerHeight(),
        viewportWidth   = $(window).width(),
        bodyWidth       = $(document.body).width(),
        bodyHeight      = $(document.body).height(),
        placement       = this.options.placement,
        offset          = 15;

    $tipArrow.removeAttr('style');
    $tip.data('popover', this);

    // test to see if popover is within viewport
    if (outerWidth < bodyWidth) {
      // over the right edge
      if (position.left + outerWidth > bodyWidth) {
        $tip.offset({ left: bodyWidth - outerWidth - offset });

        if (placement === 'top' || placement === 'bottom') {
          $tipArrow.offset({ left: elementPosition.left });
        }
      }

      // over the left edge
      if (position.left < 0) {
        $tip.offset({ left: offset });

        if (placement === 'top' || placement === 'bottom') {
          $tipArrow.offset({ left: elementPosition.left });
        }
      }
    }

    if (outerHeight < bodyHeight) {
      // over the bottom edge
      if (position.top + outerHeight > bodyHeight) {
        $tip.offset({ top: bodyHeight - outerHeight - offset });
      }

      // over the top edge
      if (position.top < 0) {
        $tip.offset({ top: offset });
      }
    }

    // test if it needs to be unique
    $.each(popovers, function(index, popover) {
      if (popover != _this && popover.tip().is(':visible')) {
        if (_this.options.unique || popover.options.unique) {
          popover.hide();
        }
      }
    });

    return returnValue;
  };
})(jQuery);
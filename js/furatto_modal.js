// Generated by CoffeeScript 1.6.3
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __slice = [].slice;

(function($, window) {
  var Modal;
  Modal = (function() {
    Modal.prototype.defaults = {
      width: 380,
      height: 280,
      showClose: true,
      showCloseText: 'Close',
      closeByEscape: true,
      closeByDocument: true,
      holderClass: '',
      overlayClass: '',
      enableStackAnimation: false,
      onBlurContainer: '',
      openOnEvent: true,
      setEvent: 'click',
      onLoad: false,
      onUnload: false,
      template: '<p>This is test popin content!</p>'
    };

    function Modal(el, options) {
      this.onDocumentClick = __bind(this.onDocumentClick, this);
      this.onDocumentKeyup = __bind(this.onDocumentKeyup, this);
      this.options = $.extend({}, this.defaults, options);
      this.$el = $(el);
      this.body = $('body');
    }

    Modal.prototype.onDocumentKeyup = function(event) {
      if (this.options.closeByEscape) {
        if (event.keyCode === 27) {
          return this.deactivate();
        }
      }
    };

    Modal.prototype.onDocumentClick = function(event) {
      if (this.options.closeByDocument) {
        if ($(event.target).is('.avgrund-overlay, .avgrund-close')) {
          event.preventDefault();
          return this.deactivate();
        }
      } else {
        if ($(event.target).is('.avgrund-close')) {
          event.preventDefault();
          return this.deactivate();
        }
      }
    };

    Modal.prototype.activate = function() {
      var _this = this;
      console.log(this.body);
      if (typeof this.options.onLoad === 'function') {
        this.options.onLoad(this.$el);
      }
      setTimeout((function() {
        return _this.body.addClass('avgrund-active');
      }), 100);
      this.body.append("<div class='avgrund-popin " + this.options.holderClass + "'>" + this.options.template + "</div>");
      $('.avgrund-popin').css({
        'width': "" + this.options.width + "px",
        'height': "" + this.options.height + "px",
        'margin-left': "-" + (this.options.width / 2 + 10) + "px",
        'margin-top': "-" + (this.options.height / 2 + 10) + "px"
      });
      if (this.options.showClose) {
        $('.avgrund-popin').append("<a href='javascript:void(0)' class='avgrund-close'>" + this.options.showCloseText + "</a>");
      }
      this.body.bind('keyup', this.onDocumentKeyup);
      return this.body.bind('click', this.onDocumentClick);
    };

    Modal.prototype.deactivate = function() {
      this.body.unbind('keyup', this.onDocumentKeyup);
      this.body.unbind('click', this.onDocumentClick);
      this.body.removeClass('avgrund-active');
      setTimeout((function() {
        return $('.avgrund-popin').remove();
      }), 500);
      if (typeof this.options.onUnload === 'function') {
        return this.options.onUnload(this.$el);
      }
    };

    return Modal;

  })();
  return $.fn.extend({
    Modal: function() {
      var args, option;
      option = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      return this.each(function() {
        var $this, data;
        $this = $(this);
        data = $this.data('Modal');
        if (!data) {
          $this.data('Modal', (data = new Modal(this, option)));
        }
        if (typeof option === 'string') {
          return data[option].apply(data, args);
        }
      });
    }
  });
})(window.jQuery, window);
/* global $ */

/**
 * @class FormValidate
 * Simple form validation
 */
export default class FormValidate {

  /**
   * [constructor description]
   * @param {string} form selector
   * @param {Object} options
   * @param {Function} callback function with error
   */
  constructor(form, options, callback) {

    self = this;

    if (typeof options === 'function') {
      callback = options;
      options = {};
    } else if (options instanceof []) {
      options = {fields: options};
    } 

    // use bootstrap selectors
    this.defaults  = {
      errorsSelector: ".help-block",
      inputContainer: ".control-group",
      errors: [],
      fields: []
    };

    this.options = $.extend( {}, this.defaults, options );

    this.$form = $(form);

    if (!this.$form.length) return;

    $(this.$form)
      .find(self.options.errorsSelector)
      .hide()
      .text('');

    // @todo add field from options
    this.options.$fields = this.$form.find('input[type=text], input[type=password]');

    this.options.$fields.each(function(i, $input) {

      var required = $(this).attr('required');
      var minlength = $(this).attr('minlength');
      var maxlength = $(this).attr('maxlength');

      if (required && !$(this).val()) {
        self.addError($(this), 'Required');
      } else if (minlength && ($(this).val().length < minlength)) {
        self.addError($(this), 'Min length: ' + minlength);
      } else if (maxlength && ($(this).val().length > maxlength)) {
        self.addError($(this), 'Max length: ' + maxlength);
      }

    });

    callback(this.options.errors);
  }

  /**
   * @param {Object} $input jQuery object
   * @param {string} error  error name for output
   */
  addError($input, error) {
    this.options.errors.push(error + ' (' + $input.attr('name') + ')');
    $input
      .closest(this.options.inputContainer)
      .find(this.options.errorsSelector)
      .show()
      .text(error);
  }

}
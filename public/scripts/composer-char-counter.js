// Controls the character counter
$(document).ready(function() {
  var $textArea = $('.new-tweet').find('textarea');
  $($textArea).on('focus', function() {
    // Watch keydown to immediately get first keystroke and held buttons
    $(this).on('keydown', function() {
      currentCharCount = this.value.length;
      var remainingCharCount = 140 - this.value.length;
      var $counter = $(this).closest('form').find('.counter');
      $($counter).text(remainingCharCount);
      if (remainingCharCount < 0) {
        $counter.addClass('negativeCharCount');
      }
      if (remainingCharCount >= 0) {
        $counter.removeClass('negativeCharCount');
      }
    });
    // Watch keyup to monitor pasting
    $(this).on('keyup', function() {
      currentCharCount = this.value.length;
      var remainingCharCount = 140 - this.value.length;
      var $counter = $(this).closest('form').find('.counter');
      $($counter).text(remainingCharCount);
      if (remainingCharCount < 0) {
        $counter.addClass('negativeCharCount');
      }
      if (remainingCharCount >= 0) {
        $counter.removeClass('negativeCharCount');
      }
    });
  });
});
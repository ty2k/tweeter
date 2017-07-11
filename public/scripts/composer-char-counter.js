$(document).ready(function() {
  //console.log("Document is ready");
  var textArea = $('.new-tweet').find('textarea');
  $(textArea).on('focus', function() {
    //console.log("Focus is on textArea");
    // DRY out of the two functions below on refactor
    $(this).on('keydown', function() {
      currentCharCount = this.value.length;
      var remainingCharCount = 140 - this.value.length;
      var counter = $(this).closest('form').find('.counter');
      $(counter).text(remainingCharCount);
      if (remainingCharCount < 0) {
        counter.addClass('negativeCharCount');
      }
      if (remainingCharCount >= 0) {
        counter.removeClass('negativeCharCount');
      }
    });
    $(this).on('keyup', function() {
      currentCharCount = this.value.length;
      var remainingCharCount = 140 - this.value.length;
      var counter = $(this).closest('form').find('.counter');
      $(counter).text(remainingCharCount);
      if (remainingCharCount < 0) {
        counter.addClass('negativeCharCount');
      }
      if (remainingCharCount >= 0) {
        counter.removeClass('negativeCharCount');
      }
    });
  });
});
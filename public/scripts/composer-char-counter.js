$(document).ready(function() {
  //console.log("Document is ready");
  var textArea = $('.new-tweet').find('textarea');
  $(textArea).on('focus', function() {
    //console.log("Focus is on textArea");
    $(this).on('keydown', function() {
      currentCharCount = this.value.length;
      //console.log("The character count is " + currentCharCount);
      var remainingCharCount = 140 - this.value.length;
      //console.log("The remaining character count is " + remainingCharCount);
      var counter = $(this).closest('form').find('.counter');
      $(counter).text(remainingCharCount);
      // If remainingCharCount falls below zero, add red text class to counter
      if (remainingCharCount < 0) {
        counter.addClass('negativeCharCount');
      }
      if (remainingCharCount >= 0) {
        counter.removeClass('negativeCharCount');
      }
    });
  });
});
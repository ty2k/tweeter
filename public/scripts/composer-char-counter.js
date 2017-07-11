$(document).ready(function() {
  console.log("Document is ready");
  var textArea = $('.new-tweet').find('textarea');
  $(textArea).on('focus', function() {
    console.log("Focus is on textArea");
    $(this).on('keyup', function() {
      currentCharCount = this.value.length;
      console.log("The character count is " + currentCharCount);
      var remainingCharCount = 140 - this.value.length;
      console.log("The remaining character count is " + remainingCharCount);
    })
  });
});
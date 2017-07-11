$(document).ready(function() {
  console.log("Document is ready");
  var textArea = $('.new-tweet').find('textarea');
  $(textArea).on('focus', function() {
    console.log("Focus is on textArea");
    $(this).on('keyup', function() {
      console.log("The character count is " + this.value.length);
    })
  });
});
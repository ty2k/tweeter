// Controls the compose button styling and .new-tweet toggle
$(document).ready(function() {
  // When mouse-overing the compose button, add styling to highlight it
  $(".compose-button").on("mouseover", function() {
    $(this).addClass("compose-hover-on");
    $(this).removeClass("compose-hover-off");
  });
  // When mouse-leaving the compose button, remove highlight styling
  $(".compose-button").on("mouseleave", function() {
    $(this).addClass("compose-hover-off");
    $(this).removeClass("compose-hover-on");
  });
  // When the compose-button is clicked, toggle the .new-tweet form
  $(".compose-button").on("click", function() {
    if ($(".new-tweet").css("display") === "block") {
      $(".new-tweet").slideUp(200);
    } else if ($(".new-tweet").css("display") === "none") {
      $(".new-tweet").slideDown(200);
      $(".new-tweet").find("textarea").focus();
    }
  });
});
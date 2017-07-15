// Controls the compose button that toggles the .new-tweet form
$(document).ready(function() {
  // When mouse-overing the compose buton
  $(".compose-button").on("mouseover", function() {
    // Add the compose-hover-on styling
    $(this).addClass("compose-hover-on");
    // Remove the default compose-hover-off styling
    $(this).removeClass("compose-hover-off");
  });
  // When mouse-leaving the compose button
  $(".compose-button").on("mouseleave", function() {
    // Re-add the default compose-hover-off styling
    $(this).addClass("compose-hover-off");
    // Remove the compose-hover-on styling
    $(this).removeClass("compose-hover-on");
  });
  // When the compose-button is clicked
  $(".compose-button").on("click", function() {
    // If the new-tweet form is visible
    if ($(".new-tweet").css("display") === "block") {
      // Hide the new-tweet form by sliding up
      $(".new-tweet").slideUp(200);
    // Else if the new-tweet form is not visible
    } else if ($(".new-tweet").css("display") === "none") {
      // Reveal the new-tweet form by sliding down
      $(".new-tweet").slideDown(200);
      // Focus on the form so user can type immediately
      $(".new-tweet").find("textarea").focus();
    }
  });
});
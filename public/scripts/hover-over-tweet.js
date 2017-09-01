// Styles .tweet elements dynamically on mouseover and mouseleave
function hoverOverTweet() {
  // When mouse-overing a tweet, darken it and show the interaction icons
  $(".tweet").on("mouseover", function(event) {
    event.stopPropagation();
    $(this).addClass("darker-border");
    var $icons = $(this).find(".interaction-icons");
    $icons.addClass("visible-icons").removeClass("interaction-icons");
    var $header = $(this).find("header");
    $header.addClass("darker-header").removeClass("light-header");
    var $avatar = $(this).find(".light-avatar");
    $avatar.addClass("darker-avatar").removeClass("light-avatar");
    var $displayName = $(this).find(".light-display-name");
    $displayName.addClass("darker-display-name").removeClass("light-display-name");
    var $handle = $(this).find(".light-handle");
    $handle.addClass("darker-handle").removeClass("light-handle");
  });
  // When mouse-leaving a tweet, lighten it and remove interaction icons
  $(".tweet").on("mouseleave", function(event) {
    event.stopPropagation();
    $(this).removeClass("darker-border");
    var $icons = $(this).find(".visible-icons");
    $icons.addClass("interaction-icons").removeClass("visible-icons");
    var $header = $(this).find("header");
    $header.addClass("light-header").removeClass("darker-header");
    var $avatar = $(this).find(".darker-avatar");
    $avatar.addClass("light-avatar").removeClass("darker-avatar");
    var $displayName = $(this).find(".darker-display-name");
    $displayName.addClass("light-display-name").removeClass("darker-display-name");
    var $handle = $(this).find(".darker-handle");
    $handle.addClass("light-handle").removeClass("darker-handle");
  });
}
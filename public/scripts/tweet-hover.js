$(document).ready(function() {
  // When mouse-overing a tweet
  $(".tweet").on("mouseover", function() {
    //console.log("Mouseover on a .tweet");
    // Darken the border
    $(this).addClass("darker-border");
    // Show the interaction icons
    var $icons = $(this).find(".interaction-icons");
    $icons.addClass("visible-icons").removeClass("interaction-icons");
    // Darken the header background
    var $header = $(this).find("header");
    $header.addClass("darker-header").removeClass("light-header");
    // Darken the avatar
    var $avatar = $(this).find(".light-avatar");
    $avatar.addClass("darker-avatar").removeClass("light-avatar");
    // Darken the display name
    var $displayName = $(this).find(".light-display-name");
    $displayName.addClass("darker-display-name").removeClass("light-display-name");
    // Darken the handle
    var $handle = $(this).find(".light-handle");
    $handle.addClass("darker-handle").removeClass("light-handle");
  });
  // When mouse-leaving a tweet
  $(".tweet").on("mouseleave", function() {
    //console.log("Mouseleave from a .tweet");
    // Lighten the border
    $(this).removeClass("darker-border");
    // Hide the interaction icons
    var $icons = $(this).find(".visible-icons");
    $icons.addClass("interaction-icons").removeClass("visible-icons");
    // Lighten the header background
    var $header = $(this).find("header");
    $header.addClass("light-header").removeClass("darker-header");
    // Lighten the avatar
    var $avatar = $(this).find(".darker-avatar");
    $avatar.addClass("light-avatar").removeClass("darker-avatar");
    // Lighten the display name
    var $displayName = $(this).find(".darker-display-name");
    $displayName.addClass("light-display-name").removeClass("darker-display-name");
    // Lighten the handle
    var $handle = $(this).find(".darker-handle");
    $handle.addClass("light-handle").removeClass("darker-handle");
  });
});
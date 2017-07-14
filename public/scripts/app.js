// jQuery is already loaded on index.html, so do everything inside ready()

$(document).ready(function() {

  // Create data array var that can be accessed anywhere in ready() function
  var data = [];

  // createTweetElement() takes a tweet object and return a tweet <article> element containing the entire HTML structure of the tweet
  function createTweetElement(targetTweet) {
    // Header - Avatar
    var avatarURLSmall = targetTweet.user.avatars.small;
    var $avatar = $("<img>").attr("src", avatarURLSmall).addClass("light-avatar");
    // Header - Display name
    var displayNameText = targetTweet.user.name;
    var $displayName = $("<span>").addClass("light-display-name").append(displayNameText);
    // Header - Handle
    var handleText = targetTweet.user.handle;
    var $handle = $("<span>").addClass("light-handle").append(handleText);
    // Header - complete, combining avatar, display name, handle
    var $header = $("<header>").addClass("light-header").append($avatar).append($displayName).append($handle);
    // Tweet body, escaped
    var $tweetBody = $("<p>").text(targetTweet.content.text);
    // Footer - span time since post
    // Use Moment.js with created_at value to produce a pretty string to output
    var timeSincePostCreated = moment.unix(targetTweet.created_at/1000).fromNow();
    var timeAndDatePostCreated = new Date(targetTweet.created_at);
    var $timeCreatedAt = $("<span>").addClass("time-since-post").append(timeSincePostCreated).attr("title", timeAndDatePostCreated);
    // Footer - interaction icons
    var iconFlag = $("<i>").addClass("fa fa-flag").attr("aria-hidden", "true").attr("title", "Flag tweet");
    var iconRetweet = $("<i>").addClass("fa fa-retweet").attr("aria-hidden", "true").attr("title", "Retweet");
    var iconHeart = $("<i>").addClass("fa fa-heart").attr("aria-hidden", "true").attr("title", "Heart tweet");
    var $interactionIcons = $("<span>").addClass("interaction-icons").append(iconHeart, iconRetweet, iconFlag);
    // Footer - complete, combining time and icons
    var $footer = $("<footer>").append($timeCreatedAt).append($interactionIcons);
    var $tweet = $("<article>").addClass("tweet").append($header).append($tweetBody).append($footer);
    // Return the $tweet HTML structure to the caller
    return $tweet;
  }

  // renderTweets calls createTweetElement on each element in the tweets array and prepends it to the #tweets-container in index.html
  function renderTweets(tweets) {
    // Loop through our tweets database object
    for (var i = 0; i < tweets.length; i++) {
      // Call createTweetElement for each tweet
      var currentTweet = createTweetElement(tweets[i]);
      // Take return value of createTweetElement, prepend it to #tweets-container
      $('#tweets-container').prepend(currentTweet);
    }
    hoverOverTweet();
  }

  // A function to handle incoming tweets through a POST route to /tweets
  function handleNewTweet(event) {
    // Use event.preventDefault to stop the browser from leaving the page
    event.preventDefault();
    // Grab our tweet body text to conditionally inspect the length
    var $textAreaInput = $(".new-tweet").find("textarea").val();
    // If the tweet is empty, reject it and inform the user
    if ($textAreaInput.length === 0) {
      $.flash("You need to write a tweet before tweeting!");
    // If the tweet is longer than 140 characters, reject it and inform the user
    } else if ($textAreaInput.length > 140) {
      $.flash("Your tweet must be 140 characters or less!");
    // Otherwise, make an AJAX POST request to /tweets
    } else {
      $.ajax({
        type: 'POST',
        url:  '/tweets',
        data: $(this).serialize()
      })
      // Reset textarea input and character count
      $(".new-tweet").find("textarea").val("");
      $(".new-tweet").find("span").text("140");
      // Empty the HTML from the #tweets-container
      $("#tweets-container").empty();
      // Empty the data array variable
      data = [];
      // Go to loadTweets() to fill the data array variable again
      loadTweets();
    }
  }
  const $form = $(".new-tweet").find("form");
  // When the .new-tweet form on index.html is submitted, handleNewTweet()
  $form.on('submit', handleNewTweet);

  // Fetch tweets through a GET route to /tweets
  function loadTweets(event) {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweetsArray) {
        // Fill the data array variable with all the tweets
        data = tweetsArray;
        renderTweets(data);
      }
    });
  }
  // Call loadTweets() after declaring it, we need it immediately on first load
  loadTweets();

  function hoverOverTweet() {
    // When mouse-overing a tweet
    $(".tweet").on("mouseover", function(event) {
      console.log("Mouseover on a .tweet");
      event.stopPropagation();
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
    $(".tweet").on("mouseleave", function(event) {
      console.log("Mouseleave from a .tweet");
      event.stopPropagation();
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
  }

});
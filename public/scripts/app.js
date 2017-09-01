$(document).ready(function() {

  // Tweet data array can be accessed anywhere in ready() function
  var data = [];

  // Take a tweet object and return a tweet <article> HTML element
  function createTweetElement(targetTweet) {
    // Header
    var avatarURLSmall = targetTweet.user.avatars.small;
    var $avatar = $("<img>").attr("src", avatarURLSmall).addClass("light-avatar");
    var displayNameText = targetTweet.user.name;
    var $displayName = $("<span>").addClass("light-display-name").append(displayNameText);
    var handleText = targetTweet.user.handle;
    var $handle = $("<span>").addClass("light-handle").append(handleText);
    var $header = $("<header>").addClass("light-header").append($avatar).append($displayName).append($handle);
    // Tweet body, escaped
    var $tweetBody = $("<p>").text(targetTweet.content.text);
    // Footer
    var timeSincePostCreated = moment.unix(targetTweet.created_at / 1000).fromNow();
    var timeAndDatePostCreated = new Date(targetTweet.created_at);
    var $timeCreatedAt = $("<span>").addClass("time-since-post").append(timeSincePostCreated).attr("title", timeAndDatePostCreated);
    var iconFlag = $("<i>").addClass("fa fa-flag").attr("aria-hidden", "true").attr("title", "Flag tweet");
    var iconRetweet = $("<i>").addClass("fa fa-retweet").attr("aria-hidden", "true").attr("title", "Retweet");
    var iconHeart = $("<i>").addClass("fa fa-heart").attr("aria-hidden", "true").attr("title", "Heart tweet");
    var $interactionIcons = $("<span>").addClass("interaction-icons").append(iconHeart, iconRetweet, iconFlag);
    var $footer = $("<footer>").append($timeCreatedAt).append($interactionIcons);
    // Tweet object - complete, combining header, tweet body, and footer
    var $tweet = $("<article>").addClass("tweet").append($header).append($tweetBody).append($footer);
    return $tweet;
  }

  // Do createTweetElement on each tweet, prepend the HTML to #tweets-container
  function renderTweets(tweets) {
    for (var i = 0; i < tweets.length; i++) {
      var currentTweet = createTweetElement(tweets[i]);
      $("#tweets-container").prepend(currentTweet);
    }
    // From hover-over-tweet.js; after rendering, hoverOverTweet() styles tweets
    hoverOverTweet();
  }

  // Fetch tweets through an AJAX GET request to /tweets
  function loadTweets(event) {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: function (tweetsArray) {
        data = tweetsArray;
        renderTweets(data);
      }
    });
  }

  // Call loadTweets() after declaring it, we need it immediately on page load
  loadTweets();

  // Handle incoming tweets through a POST route to /tweets
  function handleNewTweet(event) {
    // Use event.preventDefault to stop the browser from leaving the page
    event.preventDefault();
    var $textAreaInput = $(".new-tweet").find("textarea").val();
    // With a tweet between 1-140 chars, make an AJAX POST request to /tweets
    if ($textAreaInput.length === 0) {
      $.flash("You need to write a tweet before tweeting!");
    } else if ($textAreaInput.length > 140) {
      $.flash("Your tweet must be 140 characters or less!");
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: $(this).serialize()
      });
      // Reset input, char count, empty tweets container and data array
      $(".new-tweet").find("textarea").val("");
      $(".new-tweet").find("span").text("140");
      $("#tweets-container").empty();
      data = [];
      // Fill the data array with latest tweet data
      loadTweets();
    }
  }

  // Find the .new-tweet submission form, and handleNewTweet() on submit
  const $form = $(".new-tweet").find("form");
  $form.on("submit", handleNewTweet);
});

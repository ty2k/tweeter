/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Fake data taken from tweets.json. Test / driver code (temporary). Eventually will get this from the server.
  var data = [];
  var newTweetsData = [];

  // createTweetElement() takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet
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
    var $timeCreatedAt = $("<span>").addClass("time-since-post").append(timeSincePostCreated);
    // Footer - interaction icons
    var iconFlag = $("<i>").addClass("fa fa-flag").attr("aria-hidden", "true");
    var iconRetweet = $("<i>").addClass("fa fa-retweet").attr("aria-hidden", "true");
    var iconHeart = $("<i>").addClass("fa fa-heart").attr("aria-hidden", "true");
    var $interactionIcons = $("<span>").addClass("interaction-icons").append(iconFlag, iconRetweet, iconHeart);
    // Footer - complete
    var $footer = $("<footer>").append($timeCreatedAt).append($interactionIcons);
    var $tweet = $("<article>").addClass("tweet").append($header).append($tweetBody).append($footer);
    // This function shouldn't insert the created DOM structure to the page. It should instead just return the $tweet to the caller
    return $tweet;
  }

  // renderTweets calls createTweetElement on each element in the tweets array and prepends it to the #tweets-container in index.html
  function renderTweets(tweets) {
    setTimeout(function() {
      console.log("We're here in the renderTweets function");
      // Loop through our tweets database object
      for (var i = 0; i < tweets.length; i++) {
        // Call createTweetElement for each tweet
        var currentTweet = createTweetElement(tweets[i]);
        // Take return value of createTweetElement and appends it to the tweets container
        $('#tweets-container').prepend(currentTweet);
      }
    }, 200);
  }

  // Handle incoming tweets as the form on index.html is submitted with a POST to /tweets
  function handleNewTweet(event) {
    // Use event.preventDefault to stop the browser from leaving the page
    event.preventDefault();
    // Grab our tweet body text to conditionally inspect the length
    var $textAreaInput = $(".new-tweet").find("textarea").val();
    // If the tweet is empty, reject it and inform the user
    if ($textAreaInput.length === 0) {
      alert("You need to write a tweet before tweeting!");
    // If the tweet is longer than 140 characters, reject it and inform the user
    } else if ($textAreaInput.length > 140) {
      alert("Your tweet must be 140 characters or less!");
    // Otherwise, make an AJAX POST request to /tweets
    } else {
      console.log("A new tweet is here!");
      $.ajax({
        type: 'POST',
        url:  '/tweets',
        data: $(this).serialize()
      })
      // Reset textarea input and character count
      $(".new-tweet").find("textarea").val("");
      $(".new-tweet").find("span").text("140");
      $("#tweets-container").empty();
      // loadTweets again to grab the new tweet
      loadTweets();
    }
  }
  const $form = $(".new-tweet").find("form");
  $form.on('submit', handleNewTweet);

  // Fetch tweets through a GET route to /tweets
  function loadTweets(event) {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function (tweetsArray) {
        console.log('Success: ', tweetsArray);
        if (!data[0]) {
          data = tweetsArray;
          renderTweets(data);
        } else {
          newTweetsData = [];
          for (var j = 0; j < tweetsArray.length; j++) {
            if (data.indexOf(tweetsArray[j]) === -1) {
              data.push(tweetsArray[j]);
              newTweetsData.push(tweetsArray[j]);
            }
          }
          renderTweets(newTweetsData);
        }
        //console.log(data);
      }
    });
  }
  // Immediately call loadTweets() after declaring it, we need them immediately on load
  loadTweets();

});
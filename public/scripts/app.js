/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Fake data taken from tweets.json. Test / driver code (temporary). Eventually will get this from the server.
  var data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis <script>alert('uh oh!');</script>"
      },
      "created_at": 1461113959088
    },
    {
      "user": {
        "name": "Johann von Goethe",
        "avatars": {
          "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
          "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
          "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
        },
        "handle": "@johann49"
      },
      "content": {
        "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
      },
      "created_at": 1461113796368
    }
  ];

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
  // Loop through our tweets database object
    for (var i = 0; i < data.length; i++) {
      // Call createTweetElement for each tweet
      var currentTweet = createTweetElement(data[i]);
      // Take return value of createTweetElement and appends it to the tweets container
      $('#tweets-container').prepend(currentTweet);
    }
  }

  renderTweets(data);

  // Handle incoming tweets as the form on index.html is submitted
  function handleNewTweet(event) {
    // Use event.preventDefault to stop the browser from leaving the page
    event.preventDefault();
    console.log("A new tweet is here!");
    $.ajax({
      type: 'POST',
      url:  '/tweets',
      data: $(this).serialize()
    })
  }
  const $form = $(".new-tweet").find("form");
  $form.on('submit', handleNewTweet);

});
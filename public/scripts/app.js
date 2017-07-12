/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Test / driver code (temporary). Eventually will get this from the server.
  var tweetData = {
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
  }

  // createTweetElement() takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet
  function createTweetElement(targetTweet) {
      var $tweet = $("<article>").addClass("tweet");
      // This function shouldn't insert the created DOM structure to the page. It should instead just return the $tweet to the caller
      return $tweet;
  }

  // Call the function using the tweetData table above as a dummy database
  var $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  // Added the ID #tweets-container to our .tweet-stream section
  $('#tweets-container').prepend($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc. Changed append to prepend to make the tweet appear before the rest.

});
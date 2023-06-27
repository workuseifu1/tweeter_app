/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {


  const renderTweets = function (tweets) {
    // loops through tweets
    // calls createTweetElement for each tweet
    // takes return value and appends it to the tweets container
    $('.tweet-container').empty();
    for (let val of tweets) {
      let $tweet = createTweetElement(val);
      $('.tweet-container').prepend($tweet);
    }
  };

  const createTweetElement = function (tweet) {
    const $tweet = `<article class="tweet">  
  <header>
    <div id="name"><img src=${tweet.user.avatars}>${tweet.user.name}</div>
    <div id="handle">${tweet.user.handle}</div>
  </header>
  <div class="tweet-body"> 
  ${escape(tweet.content.text)}
  </div>
  <footer>
    <div class="time">
    ${timeago.format(new Date(tweet.created_at))}
    </div>
    <div class="icons">
      <i class="fa-sharp fas fa-solid fa-retweet"></i>
      <i class="fa-sharp fas fa-solid fa-heart"></i>
      <i class="fa-sharp fas fa-flag"></i>
    </div>            
  </footer>
</article>`/* Your code for creating the tweet element */
    // ...

    return $tweet;
  }
  //use an escape function
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // renderTweets(tweet);

  $("form").submit(function (event) {
    event.preventDefault();
    let formData = $(this).serialize();
    if (!$('#tweet-text').val()) {
      let errMsg = '<div id = "empty-tweet"> You should write something <i class = "fas fa-exclamation-triangle"></i></div>';
      $(".error-text").html(errMsg).hide().slideDown();
      return;
    }
    if ($('.counter').val() < 0) {
      let errMsg = '<div id="long-tweet">Cannot post more than 140 characters! <i class="fas fa-exclamation-triangle"></i></div>';
      $(".error-text").html(errMsg).hide().slideDown();
      return;
    }

    $(".error-text").empty();
    $.ajax({ url: '/tweets/', method: 'POST', data: formData })
      .then(response => {
        loadTweets();
      })
      .catch(err => {
        $(".error-text").html("please try again").hide().slideDown();
      });
    $("#tweet-text").val("");
    $(".counter").val(140).removeClass("counter1");
    $("#tweet-text").focus()
  });
  loadTweets = function () {
    $.get("/tweets/", (response) => {
      renderTweets(response);
    });
  };
  loadTweets();
});



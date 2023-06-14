$(document).ready(function() {
  $('#tweet-text').on('keyup', function() {
    let max = 140;
    let len = $(this).val().length;
    if (len >= max) {
      $(".counter").text(max-len).addClass("counter1")
    } else {
      let char = max- len;
      $(".counter").text(char)
    }    
  });  
});
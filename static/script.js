$(document).ready(function() {   
    $("a.youtube").YouTubePopUp();
    $(".modal").modal();
    $(".tooltipped").tooltip({delay: 50});

    $("#bottomBtn" ).on('click', function(){
      $(this).removeClass('pulse');
    });

    $(document).click(function(e) {
      if (! $(e.target).is('#player-trigger')){
         $("#youtube-player").hide();      
         $(".embed-player").attr( 'src', function ( i, val ) { return val; });
      }                
    });  

});
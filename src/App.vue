<template>
  <div id="app">
    <nav class="nav-extended">
        <div class="nav-wrapper black">
          <a href="/" class="brand-logo center"><img src="./assets/logo.png" alt="Poster"/></a>          
        </div>
        <div class="nav-content">
          <ul class="tabs grey darken-2 center row">
            <li class="tab col s3"><router-link class="active deep-purple"to="/filmes">Filmes</router-link></li>
            <li class="tab col s3 disabled"><a>Séries (em breve)</a></li>
            <li class="tab col s3 disabled"><a>Músicas (em breve)</a></li>
            <li class="tab col s3 disabled"><a>Livros (em breve)</a></li>
          </ul>
        </div>
    </nav> 
    <main class="container">
      <div class="movieInfo optionsBtns">
            <router-link class="btn-floating btn-large waves-effect waves-light deep-purple tooltipped" data-position="right" data-tooltip="Aleatório" to="/filmes/aleatorio"><i class="material-icons">shuffle</i></router-link>
            <router-link class="btn-floating btn-large waves-effect waves-light deep-purple tooltipped" data-position="right" data-tooltip="Recomendações" to="/filmes/descoberta"><i class="material-icons">sentiment_very_satisfied</i></router-link>
            <router-link class="btn-floating btn-large waves-effect waves-light deep-purple tooltipped" data-position="right" data-tooltip="Busca avançada" to="/filmes/aleatorio"><i class="material-icons">search</i></router-link>
      </div>
      <router-view></router-view>
    </main>
    <footer>
      <a id="bottomBtn" class="waves-effect waves-light btn-large btn-floating deep-purple modal-trigger pulse tooltipped" data-position="left" data-tooltip="Ajude-nos" href="#helper">
        <i class="material-icons">priority_high</i>
      </a>
      <div id="helper" class="modal center">
        <div class="modal-title">
         <h4>Ajude-nos</h4>
        </div>
        <div class="modal-content">
          <p class="flow-text">Site em teste alpha.</p>
          <p class="flow-text">Ao encontrar um erro, por favor reporte:</p>
          <p class="flow-text">email@gmail.com</p>
        </div>        
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'app',
  url: window.location.href,
}

$( document ).ready(function() {
    $("a.youtube").YouTubePopUp();
    $('.modal').modal();
    $('.tooltipped').tooltip({delay: 50});

    $("#bottomBtn" ).on('click', function(){
      $(this).removeClass('pulse');
    });
});

// Bottom Button pulse

// Youtube Popup

(function ( $ ) {
 
    $.fn.YouTubePopUp = function(options) {

        var YouTubePopUpOptions = $.extend({
                autoplay: 1
        }, options );

        $(this).on('click', function (e) {

            var youtubeLink = $(this).attr("href");

            if( youtubeLink.match(/(youtube.com)/) ){
                var split_c = "v=";
                var split_n = 1;
            }

            if( youtubeLink.match(/(youtu.be)/) || youtubeLink.match(/(vimeo.com\/)+[0-9]/) ){
                var split_c = "/";
                var split_n = 3;
            }

            if( youtubeLink.match(/(vimeo.com\/)+[a-zA-Z]/) ){
                var split_c = "/";
                var split_n = 5;
            }

            var getYouTubeVideoID = youtubeLink.split(split_c)[split_n];

            var cleanVideoID = getYouTubeVideoID.replace(/(&)+(.*)/, "");

            if( youtubeLink.match(/(youtu.be)/) || youtubeLink.match(/(youtube.com)/) ){
                var videoEmbedLink = "https://www.youtube.com/embed/"+cleanVideoID+"?autoplay="+YouTubePopUpOptions.autoplay+"";
            }

            if( youtubeLink.match(/(vimeo.com\/)+[0-9]/) || youtubeLink.match(/(vimeo.com\/)+[a-zA-Z]/) ){
                var videoEmbedLink = "https://player.vimeo.com/video/"+cleanVideoID+"?autoplay="+YouTubePopUpOptions.autoplay+"";
            }

            $("body").append('<div class="YouTubePopUp-Wrap YouTubePopUp-animation"><div class="YouTubePopUp-Content"><span class="YouTubePopUp-Close"></span><iframe src="'+videoEmbedLink+'" allowfullscreen></iframe></div></div>');

            if( $('.YouTubePopUp-Wrap').hasClass('YouTubePopUp-animation') ){
                setTimeout(function() {
                    $('.YouTubePopUp-Wrap').removeClass("YouTubePopUp-animation");
                }, 600);
            }

            $(".YouTubePopUp-Wrap, .YouTubePopUp-Close").click(function(){
                $(".YouTubePopUp-Wrap").addClass("YouTubePopUp-Hide").delay(515).queue(function() { $(this).remove(); });
            });

            e.preventDefault();

        });

        $(document).keyup(function(e) {

            if ( e.keyCode == 27 ){
                $('.YouTubePopUp-Wrap, .YouTubePopUp-Close').click();
            }

        });

    };
 
}( jQuery ));

</script>

<style>
.indicator {    
    background-color: #9e9e9e !important;   
}

body {
    color: white;
    background-color: #212121;
}

.nav-content .tabs a, .active a{
    color: white !important;
}

.tab a:hover{
    color: #9e9e9e !important;
}

.container { 
  width: 95%;
}

p {
    font-size: 1em !important;
}

html, body {
    overflow-x: hidden;
}

[v-cloak] {
    display: none;
}

.optionsBtns a{
  position: fixed;
  height: 60px !important;
  width: 60px !important;  
  top: 45vh;
  left: 2.5vw;
}

.optionsBtns a:first-child{
  top: 35vh !important;
}

.optionsBtns a:last-child{
  top: 55vh !important;
}

#bottomBtn{
  position: fixed;
  right: 3vw;
  bottom: 3vh;
}

.modal-content {
  background-color: #212121;
}

.modal-title{
  background-color: #673ab7;
}

.modal-title h4{
  margin: 0 auto;
  padding: 3%;
}

.modal {
  top: 30% !important;
  max-width: 30%;
}
/* Youtube Popup */

.YouTubePopUp-Wrap{
    position:fixed;
    width:100%;
    height:100%;
    background-color:#000;
    background-color:rgba(0,0,0,0.8);
    top:0;
    left:0;
    z-index:9999999999999;
}

.YouTubePopUp-animation{
    opacity: 0;
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: YouTubePopUp;
    animation-name: YouTubePopUp;
}

@-webkit-keyframes YouTubePopUp {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

@keyframes YouTubePopUp {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

body.logged-in .YouTubePopUp-Wrap{ /* For WordPress */
    top:32px;
    z-index:99998;
}

.YouTubePopUp-Content{
    max-width:680px;
    display:block;
    margin:0 auto;
    height:100%;
    position:relative;
}

.YouTubePopUp-Content iframe{
    max-width:100% !important;
    width:100% !important;
    display:block !important;
    height:480px !important;
    border:none !important;
    position:absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
}

.YouTubePopUp-Hide{
    -webkit-animation-duration: 0.5s;
    animation-duration: 0.5s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation-name: YouTubePopUpHide;
    animation-name: YouTubePopUpHide;
}

@-webkit-keyframes YouTubePopUpHide {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@keyframes YouTubePopUpHide {
    0% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}

@media all and (max-width: 768px) and (min-width: 10px){
    .YouTubePopUp-Content{
        max-width:90%;
    }
}

@media all and (max-width: 600px) and (min-width: 10px){
    .YouTubePopUp-Content iframe{
        height:320px !important;
    }

    .YouTubePopUp-Close{
        bottom:362px;
    }
}

@media all and (max-width: 480px) and (min-width: 10px){
    .YouTubePopUp-Content iframe{
        height:220px !important;
    }

    .YouTubePopUp-Close{
        bottom:262px;
    }
}


</style>

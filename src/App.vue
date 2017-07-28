<template>
  <div id="app">
    <nav class="nav-extended">
        <div class="nav-wrapper black">
          <a href="/" class="brand-logo center"><img src="./assets/logo.png" alt="Poster"/></a>          
        </div>
        <div class="nav-content">
          <ul class="tabs grey darken-2 center row">
            <li class="tab col s3"><a class="active deep-purple" href="/filmes">Filmes</a></li>
            <li class="tab col s3 disabled"><a>Séries (em breve)</a></li>
            <li class="tab col s3 disabled"><a>Músicas (em breve)</a></li>
            <li class="tab col s3 disabled"><a>Livros (em breve)</a></li>
          </ul>
        </div>
    </nav> 
    <main class="container">
      <div class="movieInfo optionsBtns">
            <router-link class="btn-floating btn-large waves-effect waves-light deep-purple" to="/filmes/aleatorio"><i class="material-icons">shuffle</i></router-link>
            <router-link class="btn-floating btn-large waves-effect waves-light deep-purple" to="/filmes/descoberta"><i class="material-icons">sentiment_very_satisfied</i></router-link>
            <router-link class="btn-floating btn-large waves-effect waves-light deep-purple" to="/filmes/aleatorio"><i class="material-icons">search</i></router-link>
      </div>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'app',
  url: window.location.href,
}
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
  position: absolute;
  height: 60px !important;
  width: 60px !important;  
  top: 45vh;
}

.optionsBtns a:first-child{
  top: 35vh !important;
}

.optionsBtns a:last-child{
  top: 55vh !important;
}


</style>

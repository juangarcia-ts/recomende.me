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
            <router-link class="jumpTo btn-floating btn-large waves-effect waves-light deep-purple tooltipped" data-position="right" data-tooltip="Busca avançada" to="/filmes/busca"><i class="material-icons">search</i></router-link>
      </div>
      <router-view></router-view>
    </main>
    <footer>
      <a id="bottomBtn" class=" waves-effect waves-light btn-large btn-floating deep-purple modal-trigger pulse tooltipped" data-position="left" data-tooltip="Ajude-nos" href="#helper">
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
  top: 45%;
  left: 2.5%;
}

.optionsBtns a:first-child{
  top: 35% !important;
}

.optionsBtns a:last-child{
  top: 55% !important;
}

#bottomBtn{
  position: fixed;
  right: 3%;
  bottom: 3%;
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

</style>

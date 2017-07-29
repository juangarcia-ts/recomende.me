<template>
    <div>
        <div class="row">   
          <span class="col s1"></span>      
          <input class="col s9 " type="text" v-on:keyup.enter="searchMovies" placeholder="Insira um nome de filme" v-model="query" />
          <span class="col"></span>
          <a class="btn btn_search center deep-purple col s1" v-on:click="searchMovies">Buscar</a>
        </div>
        <div v-cloak v-if="searched == false">
            <div v-cloak v-if="started == false">
              <h4 class="warning center">Insira um filme que você goste e encontre recomendações!</h4>
            </div>
            <div v-cloak v-else-if="results.length <= 0 && started == true">          
                <p v-cloak class="margin_left">Não há resultados compatíveis</p>
            </div>
            <div v-cloak class="row" v-else>   
                <span class="col s1"></span>         
                <ul class="col s5">   
                  <a v-for="result in results.slice(0,3)" v-bind:key="result.id" v-on:click="getMovies(result)">               
                    <li class="searchItem valign-wrapper">                  
                      <span v-if="result.poster_path">
                        <img :src="image + result.poster_path" alt="Poster" width="92" height="138"/>
                      </span>
                      <span v-else>
                        <img src="http://via.placeholder.com/92x160" alt="Poster"/>
                      </span>
                      <div class="searchTitle">
                        <h5>{{ result.title }}</h5>                      
                        <h6>{{ result.original_title }}</h6> 
                        <h5>{{ formatDate(result.release_date) }}</h5>  
                      </div>                      
                    </li>  
                  </a>                     
                </ul> 
                <ul class="col s6">
                  <a v-cloak v-for="result in results.slice(3,6)" v-bind:key="result.id" v-on:click="getMovies(result)">               
                    <li class="searchItem valign-wrapper">                  
                      <span v-if="result.poster_path">
                        <img :src="image + result.poster_path" alt="Poster" width="92" height="138"/>
                      </span>
                      <span v-else>
                        <img src="http://via.placeholder.com/92x160" alt="Poster"/>
                      </span>
                      <div class="searchTitle">
                        <h5>{{ result.title }}</h5>                      
                        <h6>{{ result.original_title }}</h6> 
                        <h5>{{ formatDate(result.release_date) }}</h5>  
                      </div>                      
                    </li>  
                  </a>                     
                </ul>           
            </div>
        </div>
        <div v-cloak v-else class="margin_left">          
          <div v-if="relateds.length <= 0" class="center">
            <h3 class="sorry">Desculpe o transtorno</h3>
            <p class="flow-text">Não há recomendações para esse filme</p>
          </div>
          <div v-else>
            <div v-if="last_searched" class="center relateds_title">
              <h4>Relacionados a "{{ last_searched }}" 
                <a class="show-hideBtn center-align waves-effect waves-light btn deep-purple" v-on:click="showRecomendations(showMore)">
                  <span v-if="showMore == false">Mostrar todos</span>
                  <span v-else>Esconder</span>
                </a>
              </h4>              
            </div>
            <div v-if="showMore == false">
              <div class="row" v-for="(related, index) in relateds.slice(0,2)" v-bind:key="related.id">
                <img class="col s2 relatedMovie" :src="poster + related.poster_path" alt="Poster" height="200"/>
                <div class="col s10">
                  <h4>{{ related.title }} {{trailers.index}}</h4>
                  <h6>{{ related.original_title }}</h6>           
                  <p class="flow-text"><b>Lançamento:</b> {{ formatDate(related.release_date) }}</p>
                  <p class="flow-text"><b>Nota TMDB:</b> {{related.vote_average}}</p>
                  <a class="youtube waves-effect waves-light btn-large black" :href="youtube + trailers[index]">
                  <i class="material-icons left">play_circle_outline</i> Assistir o trailer
                  </a>
                </div>
              </div>
            </div>
            <div v-else>
              <div class="row" v-for="related in relateds" v-bind:key="related.id">
                <img class="col s2 relatedMovie" :src="poster + related.poster_path" alt="Poster" height="200"/>
                <div class="col s10">
                  <h4>{{ related.title }} </h4>
                  <h6>{{ related.original_title }}</h6>           
                  <p class="flow-text"><b>Lançamento:</b> {{ formatDate(related.release_date) }}</p>
                  <p class="flow-text"><b>Nota TMDB:</b> {{related.vote_average}}</p>
                  <a class="youtube waves-effect waves-light btn-large black" :href="youtube + trailers[index]">
                  <i class="material-icons left">play_circle_outline</i> Assistir o trailer
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>        
    </div>
</template>

<script>
const searchURL = "https://api.themoviedb.org/3/search/movie?api_key=01b947dec68cf8010c87b5551e2a67bc&language=pt-BR&page=1&include_adult=false&query="
const discoverURL = "https://api.themoviedb.org/3/movie/";
const discoverURL2 = "/recommendations?api_key=01b947dec68cf8010c87b5551e2a67bc&language=pt-BR&page=1";
const trailerURL = "https://www.googleapis.com/youtube/v3/search?part=id&key=AIzaSyAB9zZ1aCx2VQY_VrGdIpcQ30pwsOk_Up4&q=";
const genres = {28: 'Ação', 12: 'Aventura', 35: 'Comédia', 18: 'Drama', 27: 'Terror', 10749: 'Romance',
                878: 'Ficção Científica', 53: 'Thriller', 9648: 'Mistério', 27: 'Terror', 10751: 'Família',
                80: 'Crime', 10402: 'Musical', 37: 'Faroeste', 10752: 'Guerra', 16: 'Animação', 14: 'Fantasia',
                99: 'Documentário', 10752: 'Cinema TV', 36: 'História'};

export default {  
  data: function () {
    return {      
      query: '',
      results: [],
      image: "https://image.tmdb.org/t/p/w92/",
      poster: "https://image.tmdb.org/t/p/w154/",
      started: false,
      relateds: [],
      searched: false,
      showMore: false,
      youtube: "https://www.youtube.com/watch?v=",
      trailers: [],
      last_searched: '',
    }
  },
  methods: {    
    searchMovies: function (query) {
      this.searched =  false;
      let self = this;  
     
      axios.get(searchURL + this.query)
            .then(response => {self.results = response.data.results.slice(0,6)
      }).catch( error => { console.log(error); });
      
      this.started = true;
    },
    formatDate: function (date) {
      return date.substring(0,4);
    },    
    getMovies: function(movie){
      this.last_searched = movie.title;
      this.showMore = false;
      let self = this;  
      
      axios.get(discoverURL + movie.id + discoverURL2)
            .then(function (response) {              
              self.relateds = response.data.results;
              console.log(self.relateds.length)               
              for (let i = 0; i < self.relateds.length; i++){                            
                self.getTrailer(self.relateds[i].title); 
              }
      }).catch( error => { console.log(error); })

      this.searched = true;
    },
    getTrailer: function(title) {
      let self = this;

      axios.get(trailerURL + title + "trailer")
        .then(response => {self.trailers.concat(response.data.items[0].id.videoId);
      }).catch( error => { console.log(error); });
      
    }, 
    showRecomendations: function(state) {
      console.log(state + "," + this.showMore);
      if (state == false){
        this.showMore = true;
      }else{
        this.showMore = false;
      }
      console.log(state + "," + this.showMore);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn_search{
    margin-top: 1%;
}

.margin_left{
  margin-left: 10%;
}

.searchTitle{
  margin-left: 5%;
}

.searchItem{
  margin-top: 5%;
}

a{
  text-decoration: none;
  color: white;
}

.searchItem:hover{
  border: 1px solid #673ab7;  
  cursor: pointer;
  overflow-y: hidden;
}

.searchItem img{
  margin-top: 10px;
  margin-left: 10px;
}

.relatedMovie{
  margin-top: 2%;
  max-width: 15%;
}

.warning{
  margin-top: 20vh;
}

.relateds_title{
  margin-bottom: 5%;
}

.show-hideBtn{
  margin-bottom: 1%;
  margin-left: 5%;
}

</style>

<template>
    <div>
        <div class="row">
          <input class="col s9 " type="text" v-on:keyup.enter="searchMovies" placeholder="Insira um nome de filme" v-model="query" />
          <span class="col s1"></span>
          <a class="btn btn_search center purple col s1" v-on:click="searchMovies">Buscar</a>
        </div>
        <div v-cloak v-if="results.length <= 0 && started == true">          
            <p>Não há resultados compatíveis</p>
        </div>
        <div v-cloak v-else>
            <ul v-for="result in results">   
                <span v-if="result.poster_path">
                  <img :src="image + result.poster_path" alt="Poster"/>
                </span>
                <span v-else>
                   <img src="http://via.placeholder.com/92x130" alt="Poster"/>
                </span>
                <span>{{ result.title }} ({{ formatDate(result.release_date) }})</span>                
            </ul>            
        </div>        
    </div>
</template>

<script>
const searchURL = "https://api.themoviedb.org/3/search/movie?api_key=01b947dec68cf8010c87b5551e2a67bc&language=pt-BR&page=1&include_adult=false&query="

export default {  
  data: function () {
    return {      
      query: '',
      results: [],
      image: "https://image.tmdb.org/t/p/w92/",
      started: false,
    }
  },
  methods: {    
    searchMovies: function (query) {
      let self = this;  
     
      axios.get(searchURL + this.query)
            .then(response => {self.results = response.data.results.slice(0,5)
      }).catch( error => { console.log(error); });

      console.log(self.started)

      this.started = true;

      console.log(self.started);
    },
    formatDate: function (date) {
      return date.substring(0,4);
    },    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.btn_search{
    margin-top: 12px;
}
</style>

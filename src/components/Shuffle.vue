<template>
    <div>
        <div v-cloak class="row">          
          <div class="movieInfo col s5 center">
            <img class="responsive-img" :src="image + movie.poster_path" alt="Poster" width="400"/>
          </div>
          <div class="movieInfo col s6 center">
            <table>
              <tbody>
                <tr>
                  <td v-for="genre in movie.genre_ids" v-bind:key="genre.id" class="chip">{{ getGenres(genre) }}</td>
                </tr>
              </tbody>
            </table>           
            <h2>{{movie.title}}</h2>
            <h6>{{movie.original_title}}</h6>
            <p class="flow-text">{{movie.overview}}</p>             
            <p class="flow-text"><b>Lançamento:</b> {{ formatDate(movie.release_date) }}</p>
            <p class="flow-text"><b>Nota TMDB:</b> {{movie.vote_average}}</p>
            <p class="flow-text"></p>
            <p class="flow-text"></p>
            <p class="flow-text"></p>
            <a v-on:click="getRandomMovie" onclick="Materialize.toast('Atualizado!', 2000)" class="waves-effect waves-light btn-large deep-purple">
              <i class="material-icons left">autorenew</i> Tentar novamente
            </a>
            <a class="youtube waves-effect waves-light btn-large black" :href="youtube + trailer">
              <i class="material-icons left">play_circle_outline</i> Assistir o trailer
            </a>
          </div>          
        </div>            
    </div>
</template>

<script>
const discoverURL = "https://api.themoviedb.org/3/discover/movie?api_key=01b947dec68cf8010c87b5551e2a67bc&language=pt-BR&sort_by=vote_average.desc&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=1990-01-01&with_original_language=en&with_genres=";
const trailerURL = "https://www.googleapis.com/youtube/v3/search?part=id&key=AIzaSyAB9zZ1aCx2VQY_VrGdIpcQ30pwsOk_Up4&q=";
const genres = {28: 'Ação', 12: 'Aventura', 35: 'Comédia', 18: 'Drama', 27: 'Terror', 10749: 'Romance',
                878: 'Ficção Científica', 53: 'Thriller', 9648: 'Mistério', 27: 'Terror', 10751: 'Família',
                80: 'Crime', 10402: 'Musical', 37: 'Faroeste', 10752: 'Guerra', 16: 'Animação', 14: 'Fantasia',
                99: 'Documentário', 10752: 'Cinema TV', 36: 'História'};

export default {   
  data: function () {
    return {  
      movie: [], 
      trailer: '',
      youtube: "https://www.youtube.com/watch?v=",
      image: "https://image.tmdb.org/t/p/w500",  
      genres: [],
    }
  },   
  beforeMount(){
    this.getRandomMovie();
  },
  methods: {
    getRandomMovie: function() {   
      let random_number = Math.floor((Math.random() * 20));
      let keys = Object.keys(genres);      
      let random_gender = keys[Math.floor(Math.random()*keys.length)];
      let today = "&primary_release_date.lte=" + (new Date()).toISOString().slice(0,10);
      let movie_title;   
      let movie_genres = []; 
      let self = this;    

      axios.get(discoverURL + random_gender + today)
        .then(function (response) {
          self.movie = response.data.results[random_number]; 
          if (self.movie.overview.length > 0){
            self.getTrailer(response.data.results[random_number].title); 
          }else{
            self.getRandomMovie();
          }       
      }).catch( error => { console.log("error"); });   
    },   
    getTrailer: function(title) {
      let self = this;

      axios.get(trailerURL + title + "trailer")
        .then(response => {self.trailer = response.data.items[0].id.videoId
      }).catch( error => { console.log(error); });
    },  
    getGenres: function(movie_genre){      
      return genres[movie_genre];
    }, 
    formatDate: function (data) {
      return data.substring(5,7) + "/" + data.substring(0,4);
    }
  }
} 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped> 
  .row {
    margin-top: 5% !important; 
  }

  .responsive-img{
    margin-left: 10%;
  }

</style>

<template>
  <div class="container">
    <div
      :class="{'no-result': !movies.length}"
      class="inner">
      <div
        v-if="loading"
        class="spinner-border text-primary" />
      <Loader v-if="loading" />
      <div
        v-if="message"
        class="message">
        {{ message }}
      </div>
      <!-- MovieItem 에 props로 전달 -->
      <div
        v-else
        class="movies">
        <MovieItem
          v-for="movie in movies"
          :key="movie.imdbID"
          :movie="movie" />
      </div> 
    </div>
  </div>
</template>

<script>
import MovieItem from '~/components/MovieItem'
import Loader from '~/components/Loader'
export default {
  components: {
    MovieItem
  },
  computed: {
    // computed를 사용하는 이유
    // 최초 비어있는 데이터가 아니라 api를 통해 받아온 movies를 사용하기 위해
    movies() {
      return this.$store.state.movie.movies
    },
    message() {
      return this.$store.state.movie.message
    },
    loading() {
      return this.$store.state.movie.loading
    }
  } 
}
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";
.container {
  margin-top: 30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align: center;
    &.no-result {
      padding: 70px 0;
    }
  }
  .message {
    color: $gray-400;
    font-size: 20px;
  }
  .movies {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
}
</style>
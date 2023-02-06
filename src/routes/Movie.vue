<template>
  <div class="container">
    <templete v-if="loading">
      <div class="skeletons">
        <div class="skeleton poster" />
        <div class="specs">
          <div class="skeleton title" />
          <div class="skeleton spec" />
          <div class="skeleton plot" />
          <div class="skeleton etc" />
          <div class="skeleton etc" />
          <div class="skeleton etc" />
        </div>
      </div>
      <Loader 
        :size="3"
        :z-index="9" 
        fixed />
    </templete>
    <div
      v-else
      class="movie-details">
      <div
        :style="{backgroundImage: `url(${requestDiffSizeImage(theMovie.Poster)})`}"
        class="poster">
        <Loader 
          v-if="imageLoading"
          absolute />
      </div>
      <div class="specs">
        <div class="title">
          {{ theMovie.Title }}
        </div>
        <div class="labels">
          <span>{{ theMovie.Released }}</span>
          <span>{{ theMovie.Runtime }}</span>
          <span>{{ theMovie.Coutry }}</span>
        </div>
        <div class="plot">
          {{ theMovie.Plot }}
        </div>
        <div class="ratings">
          <h3>Ratings</h3>
          <div class="rating-wrap">
            <div
              v-for="{Source: name, Value: score} in theMovie.Ratings"
              :key="name"
              :title="name"
              class="rating">
              <img
                :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`" 
                :alt="name" />
              <span>{{ score }}</span>
            </div>
          </div>
        </div>
        <div>
          <h3>Actors</h3>
          {{ theMovie.Actors }}
        </div>
        <div>
          <h3>Director</h3>
          {{ theMovie.Production }}
        </div>
        <div>
          <h3>Genre</h3>
          {{ theMovie.Genre }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from '~/components/Loader'
export default {
  components: {
    Loader
  },
  data() {
    return {
      imageLoading: true
    }
  },
  computed: {
    theMovie() {
      return this.$store.state.movie.theMovie
    },
    loading() {
      return this.$store.state.movie.loading
    }
  },
  created() {
    console.log(this.$route)
    this.$store.dispatch('movie/searchMovieWithId', {
      id: this.$route.params.id
    })
  },
  methods: {
    requestDiffSizeImage(url, size = 700) {
      if (!url || url === 'N/A') {
        this.imageLoading = false
        return '' // 명시하지 않으면 undefined 가 반환 됨
      }
      const src = url.replace('SX300', `SX${size}`)
      this.$loadImage(src)
      .then(() => {
        // await를 사용하면 loading이 끝날 때 까지 기다렸다가 return src 를 실행하게됨
        // then 안의 코드는 loading이 끝나면 실행되며
        // return src 는 이와 상관없이 동작하게 됨
        this.imageLoading = false
      })
      return src
    }
  }
}
</script>
<style lang="scss" scoped>
@import "../scss/main.scss";
.container {
  padding-top: 40px;
}
.skeletons {
  display: flex;
  .poster {
    flex-shrink: 0;
    width: 500px;
    height: 500px * calc(3 / 2);
    margin-right: 70px;
  }
  .specs {
    flex-grow: 1;
  }
  .skeleton {
    border-radius: 10px;
    background-color: $gray-200;
    &.title {
      width: 80%;
      height: 70px;
    }
    &.spec {
      width: 60%;
      height: 30px;
      margin-top: 20px;
    }
    &.plot {
      width: 100%;
      height: 250px;
      margin-top: 20px;
    }
    &.etc {
      width: 50%;
      height: 50px;
      margin-top: 20px;
    }
  }
}
.movie-details {
  display: flex;
  color: $gray-600;
  .poster {    
    width: 500px;
    height: 500px * calc(3 / 2);
    margin-right: 70px;
    border-radius: 10px;
    background-color: $gray-200;
    background-size: cover;
    background-position: center;
    position: relative;
    flex-shrink: 0;
  }
  .specs{
    flex-grow: 1;
    .title {
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 70px;
      line-height: 1;
      margin-bottom: 30px;
    }
    .labels {
      color: $primary;
      span {
        &::after {
          content: "\00b7";
          margin: 0 6px;
        }
        &:last-child::after {
          display: none;
        }
      }
    }
    .plot {
      margin-top: 20px;
    }
    .ratings {
      .rating-wrap {
        display:flex;
        .rating {
          display: flex;
          align-items: center;
          margin-right: 32px;
          img {
            height: 30px;
            flex-shrink: 0;
            margin-right: 6px;
          }
        }
      }
    }
    h3 {
      margin: 24px 0 6px;
      color: $black;
      font-family: "Oswald", sans-serif;
      font-size: 20px
    }
  }
  @include media-breakpoint-down(xl) {
    .poster {
      width: 300px;
      height: 300px * calc(3/2);
      margin-right: 40px;
    }
  }
  // viewport의 크기가 lg 보다 작아지면 flex의 item 들을 수평에서 수직으로 변경
  @include media-breakpoint-down(lg) {
    display: block;
    .poster {
      margin-bottom: 40px;
    }
  }
  @include media-breakpoint-down(md) {
    .specs {
      .title {
        font-size: 50px;
      }
      .ratings {
        .rating-wrap {
          display: block;
          .rating {
            margin-top: 10px;
          }
        }
      }
    }
  }
}
</style>
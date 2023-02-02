<template>
  <div class="about">
    <div class="photo">
      <!-- absolute : 부모요소 기준으로 가운데 배치 -->
      <!-- 이 때 부모요소는 position : relative; 를 가져야함 -->
      <Loader
        v-if="imageLoading"
        absolute /> 
      <img 
        :src="image" 
        :alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
    <div>{{ phone }}</div>
  </div>
</template>

<script>
import Loader from '~/components/Loader'
export default {
  components : {
    Loader
  },
  data() {
    return {
      imageLoading: true
    }
  },
  computed: {
    image() {
      return this.$store.state.about.image
    },
    name() {
      return this.$store.state.about.name
    },
    email() {
      return this.$store.state.about.email
    },
    blog() {
      return this.$store.state.about.blog
    },
    phone() {
      return this.$store.state.about.phone
    }
  },
  // Life Cycle에서는 비동기 함수를 사용할 수 없음
  // async mounted() { await this.init()}
  // 별도의 함수를 만들어서 사용
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      await this.$loadImage(this.image)
      this.imageLoading = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";
.about {
  text-align: center;
  .photo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img {
      width: 100%;
    }
  }
  .name {
    font-size: 40px;
    font-family: "Oswald", sans-serif;
    margin-bottom: 20px;
  }
}
</style>
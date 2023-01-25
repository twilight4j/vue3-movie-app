<template>
  <div>{{ movie.Title }}</div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      // 배열이나 객체 데이터는 데이터가 가변할 수 있음
      // 함수를 만들어서 객체(배열)데이터를 반환하도록 해야함
      default: () => ({})
    }
  }
}
</script>
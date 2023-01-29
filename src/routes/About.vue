<template>
  <h1>About!{{ test }}</h1>
</template>

<script>
export default {
  data() {
    return {
      test: 't'
    }
  },
  create() {
    console.log('About')
  }
}
</script>

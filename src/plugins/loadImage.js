export default {
  install(app) {
    app.config.globalProperties.$loadImage = src => {
      return new Promise(resolve => {
        // HTML의 element의 요소 img tag를 생성해서 메모리에 저장
        // img tag에 src를 삽입하고
        // 그 이미지가 로드가 되면 콜백함수의 내용이 실행
        const img = document.createElement('img')
        img.src = src
        img.addEventListener('load', () => {
          resolve()
        })
      })
    }
  }
}
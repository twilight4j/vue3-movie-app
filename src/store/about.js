export default {
  namespaced: true,
  // 객체데이터는 배열데이터와 동일하게 참조형 데이터이고
  // 데이터의 불변성을 유지하려면 함수로 만들어서 반환해줘야 
  // state에서 사용하는 데이터가 고유해질 수 있음
  state: () => ({
    name: 'HEROPY',
    email: 'thesecon@gmmail.com',
    blog: 'https://heropy.blog',
    phone: '+82-10-1234-5678',
    image: 'https://heropy.blog/css/images/logo.png'
  })
  
}
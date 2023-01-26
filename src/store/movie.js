import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

export default {
  namespaced: true,
  state: () => ({
      movies: [],
      message: '',
      loading: false
  }),
  getters: {
    movieIds(state) {
      return state.movies.map(m => m.imdbID)
    }
  },
  mutations: {
    updateState(state, payload) {
      // ['movies', 'message', 'loading']
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state){
      state.movies = []
    }
  },
  actions: {
    async searchMovies({ state, commit }, payload) {
      try {
        const res = await _fetchMovie({
          ...payload,
          page : 1
        })
        const { Search, totalResults } = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })

        console.log(totalResults) // 268 => 27
        console.log(typeof totalResults) // string
        const total = parseInt(totalResults, 10) //10진법
        const pageLength = Math.ceil(total / 10)
        
        // 추가 요청!
        if(pageLength > 1) {
          for(let page = 2; page <= pageLength; page +=1) {
            if(page > (payload.number / 10)) break
            const res = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = res.data
            commit('updateState', {
              movies: [
                ...state.movies, 
                ..._uniqBy(Search, 'imdbID')] // 기존 movies 부터 전개하여 할당하고 검색한 데이터를 전개하여 할당
            })
          }
        }
      } catch (message) {
        commit('updateState',{
          movies: [],
          message
        })
      }
    }
  }
}

function _fetchMovie(payload) {
  const { title, type, year, page } = payload
  const OMDB_API_KEY = '7035c60c'
  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`

  return new Promise((resolve, reject) => {
    axios.get(url)
    .then(res => {
      if(res.data.Error){
        reject(res.data.Error)
        return
      }
      resolve(res)
    })
    .catch(err => {
      reject(err.message)
    })
  })
}
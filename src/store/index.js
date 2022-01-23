import { createStore } from 'vuex'

const store = createStore({
  state () {
    return {
      theme: 'default',
      filters: []
    }
  },
  getters: {
  },
  mutations: {
    initFilter (state, filters) {
      state.filters = filters
    },
    changeFilter (state, newValue) {
      state.filters[newValue.index] = newValue.value
    }
  },
})

export default store

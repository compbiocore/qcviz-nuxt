export const state = () => ({
  data: [],
})
export const mutations = {
  SET_DATA(state, payload) {
    state.data = payload
  },
}
export const actions = {
  async fetchData({ commit }) {
    const data = await this.$axios.$get('/samples')
    const parsed = data.data.map((d) => {
      const json = JSON.parse(JSON.parse(d.json))
      d.json = json
      return d
    })
    commit('SET_DATA', parsed)
  },
}

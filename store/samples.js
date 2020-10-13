export const state = () => ({
  data: [],
  pages: null,
});
export const mutations = {
  SET_DATA(state, payload) {
    state.data = payload.parsed;
    state.pages = payload.pages;
  },
};
export const actions = {
  async fetchData({ commit }, route) {
    console.log(route);
    const data = await this.$axios.$get(route);
    const parsed = data.data.map((d) => {
      const json = JSON.parse(JSON.parse(d.json));
      d.json = json;
      return d;
    });
    const pages = data.pages;
    commit('SET_DATA', { parsed, pages });
  },
};

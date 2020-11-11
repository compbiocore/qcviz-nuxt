import flatten from 'lodash/flatten';

export const state = () => ({
  data: [],
});
export const mutations = {
  SET_DATA(state, payload) {
    state.data = payload;
  },
};
export const actions = {
  async fetchData({ commit }, context) {
    const samples = context.samples.split(',');
    const samplePromises = samples.map((sid) => {
      const route = `/samples/${sid}/${context.program}/${context.metric}`;
      const data = this.$axios.$get(route);
      return data;
    });
    const data = await Promise.all(samplePromises);
    const result = data.map((d) => {
      return d.data.map((sd) => {
        return {
          sid: sd.id.split('-')[0],
          position: sd.attributes.p,
          i: sd.attributes.i,
          s: sd.attributes.s,
          n: sd.attributes.n,
          isr3a: sd.attributes.isr3a,
          isr5a: sd.attributes.isr5a,
        };
      });
    });
    commit('SET_DATA', flatten(result));
  },
};

<template>
  <div>
    <DMultiLineChart
      id="linechart"
      :dataset="data"
      :min-width="400"
      x="position"
      x-label="position"
      y="i"
      y-label="i"
      variable="sid"
      :include-actions="true"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { DMultiLineChart } from '@brown-ccv/disco-vue-components';

export default {
  components: {
    DMultiLineChart,
  },
  async fetch({ store, route }) {
    const context = {
      ...route.params,
      ...route.query,
    };
    await store.dispatch('metric/fetchData', context);
  },
  computed: {
    ...mapState({
      data: (state) => state.metric.data.filter((d) => d.i < 0.005),
    }),
  },
};
</script>

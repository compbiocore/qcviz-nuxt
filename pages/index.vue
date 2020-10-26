<template>
  <div class="container">
    <Table :data="tableData" :pages="pages" @goto="goTo" @search="search" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  async fetch({ store }) {
    await store.dispatch('samples/fetchData', '/samples');
  },
  computed: {
    ...mapState({
      data: (state) => state.samples.data,
      pages: (state) => state.samples.pages,
    }),
    tableData() {
      return this.data.map((d) => {
        const meta = d.attributes;
        return {
          sample_id: meta.sample_id,
          experiment_id: meta.experiment_id,
          scientific_name: meta.scientific_name,
          library_layout: meta.library_layout,
          library_selection: meta.library_selection,
          library_source: meta.library_source,
          library_name: meta.library_name,
        };
      });
    },
  },
  methods: {
    async goTo(payload) {
      await this.$store.dispatch('samples/fetchData', this.pages[payload]);
    },
    async search(payload) {
      await this.$store.dispatch(
        'samples/fetchData',
        `samples?search=${payload}`
      );
    },
  },
};
</script>

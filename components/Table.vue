<template>
  <div>
    <v-table
      class="table-hover table"
      :data="data"
      selection-mode="multiple"
      selected-class="has-background-grey-lighter"
      @selectionChanged="selectedRows = $event"
    >
      <thead slot="head">
        <tr>
          <v-th
            v-for="heading in ths"
            :key="'th' + heading"
            :sort-key="heading"
          >
            {{ heading | humanize }}
          </v-th>
        </tr>
      </thead>
      <tbody slot="body" slot-scope="{ displayData }">
        <v-tr v-for="row in displayData" :key="row.guid" :row="row">
          <td v-for="k in Object.keys(row)" :key="'td' + k">
            {{ row[k] }}
          </td>
        </v-tr>
      </tbody>
    </v-table>
    <footer v-if="pages" class="table-footer">
      <DButton
        v-if="pages.prev"
        type="button"
        class="page-button mx-2"
        name="Previous"
        @click="goto('prev')"
      >
        <template #icon-left>
          <DIcon name="caret-left" family="light" class="mr-2" />
        </template>
      </DButton>
      <DButton
        v-if="pages.next"
        type="button"
        class="page-button mx-2"
        name="Next"
        @click="goto('next')"
      >
        <template #icon-right>
          <DIcon name="caret-right" family="light" class="ml-2" />
        </template>
      </DButton>
    </footer>
  </div>
</template>

<script>
import { DIcon, DButton } from '@brown-ccv/disco-vue-components';

export default {
  components: {
    DIcon,
    DButton,
  },
  filters: {
    humanize(str) {
      const cleanStr = str.replace(/_/g, ' ');
      const upperFirst = cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1);
      return upperFirst;
    },
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    pages: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      selectedRows: [],
    };
  },
  computed: {
    ths() {
      return Object.keys(this.data[0]);
    },
  },
  methods: {
    goto(event) {
      this.$emit('goto', event);
    },
  },
};
</script>
<style lang="scss" scoped>
.table-footer {
  display: flex;
  justify-content: center;
  justify-items: center;
}
</style>

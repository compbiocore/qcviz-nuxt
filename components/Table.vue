<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th v-for="heading in ths" :key="'th' + heading">
            <div class="is-flex">
              {{ heading | humanize }}
              <button
                type="button"
                class="d-button sort-button"
                @click="sort(heading)"
              >
                <DIcon name="sort" family="light" />
              </button>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(datum, i) in sorted" :key="'row' + i">
          <td><input type="checkbox" /></td>
          <td v-for="k in Object.keys(datum)" :key="'td' + k">
            {{ datum[k] }}
          </td>
        </tr>
      </tbody>
    </table>
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
import { DIcon, DButton } from '@brown-ccv/disco-vue-components'

export default {
  components: {
    DIcon,
    DButton,
  },
  filters: {
    humanize(str) {
      const cleanStr = str.replace(/_/g, ' ')
      const upperFirst = cleanStr.charAt(0).toUpperCase() + cleanStr.slice(1)
      return upperFirst
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
      currentSortDir: 'asc',
      currentSort: Object.keys(this.data[0])[0],
    }
  },
  computed: {
    ths() {
      return Object.keys(this.data[0])
    },
    sorted() {
      return this.data.slice().sort((a, b) => {
        let modifier = 1
        if (this.currentSortDir === 'desc') modifier = -1
        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier
        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier
        return 0
      })
    },
  },
  methods: {
    goto(event) {
      this.$emit('goto', event)
    },
    sort(sortby) {
      this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      this.currentSort = sortby
    },
  },
}
</script>
<style lang="scss" scoped>
.table-footer {
  display: flex;
  justify-content: center;
  justify-items: center;
}
.sort-button {
  border: 0;
  font-size: 0.6rem;
}
</style>

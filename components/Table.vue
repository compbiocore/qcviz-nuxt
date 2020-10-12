<template>
  <div>
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th v-for="heading in ths" :key="'th' + heading">
            {{ heading }}
            <button type="button" class="sort-button" @click="sort(heading)">
              Sort
            </button>
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
      <tfoot v-if="pages" class="table-footer">
        <p>
          <button
            v-if="pages.prev"
            type="button"
            class="page-button"
            @click="goto('prev')"
          >
            <span class="previous">Previous</span>
          </button>
          <button
            v-if="pages.next"
            type="button"
            class="page-button"
            @click="goto('next')"
          >
            <span class="next">Next</span>
          </button>
        </p>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
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

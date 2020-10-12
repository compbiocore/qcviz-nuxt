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
    </table>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
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
    sort(sortby) {
      this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc'
      this.currentSort = sortby
    },
  },
}
</script>

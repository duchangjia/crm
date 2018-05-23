<template>
  <div class="wrap clearfix">
    <department @change="handleSelect"></department>
    <employee :selected-dept="selectedDept"></employee>
  </div>
</template>

<script>
import Department from './children/department'
import Employee from './children/employee'

export default {
  components: {
    Department,
    Employee
  },
  data() {
    return {
      selectedDept: null
    }
  },
  created() {

  },
  methods: {
    handleSelect(data) {
      console.log(data)
      this.selectedDept = data
    }
  }
}
</script>

<style lang="scss" scoped>
  .wrap {
    position: relative;
    height: 100%;
    min-height: calc(100% - 100px);
  }
</style>

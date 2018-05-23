<template>
  <div class="full-page">
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      perm: state => state.user.perm
    })
  },
  components: {

  },
  created() {
    // console.log(this.$root)
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>

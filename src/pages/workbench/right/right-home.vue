<template lang="html">
  <div class="">
    <v-contacts></v-contacts>
    <v-studentInfo v-if="intentSubject.length" :intentSubject="intentSubject"></v-studentInfo>
    <v-followup v-if="intentSubject.length" :intentSubject="intentSubject"></v-followup>

  </div>
</template>

<script>
import Vcontacts from './contacts.vue';  // 联系学员组件
import Vfollowup from './follow-up.vue'; // 跟进信息组件
import VstudentInfo from './student-info.vue'; // 学员信息组件
export default {
  props: ['intentSubject'],
  components: {
    'v-contacts': Vcontacts,
    'v-studentInfo': VstudentInfo,
    'v-followup': Vfollowup
  },
  created(){
    // console.log(this.$router.currentRoute.query.index);
    this.$store.state.workbench.status = false;
  }
}
</script>

<style lang="css" scoped>

</style>

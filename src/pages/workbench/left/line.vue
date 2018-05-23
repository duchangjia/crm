<template lang="html">
  <p :class="$style.line">
		<span :class="$style.span_border"></span>
		<span :class="$style.text">共有{{num}}个名片</span>
		<span :class="$style.span_border"></span>
	</p>
</template>

<script>
export default {
  props:['num']
}
</script>
<!-- 这里没有用scoped 用module会更好一些 -->
<style lang="scss" module >
  .line{
    text-align: center;
    width: 100%;
    padding: 0;
    text-indent: 0;
    margin: 20px 0px 10px 0;
    .span_border {
      content: "";
      display: inline-block;
      width: 95px;
      height: 1px;
      position: relative;
      background: #afbdcc;
      top: -4px;
     }
     .text {
      font-size: 14px;
      line-height: 0px;
      text-align: center;
      color: #a8b0b9;
    }
  }
</style>
